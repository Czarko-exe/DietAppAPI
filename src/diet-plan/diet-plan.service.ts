import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateDietPlanDto } from './dto/create-diet-plan.dto';
import { AddMealDto } from './dto/add-meal.dto';
import { AddMealItemDto } from './dto/add-meal-item.dto';

@Injectable()
export class DietPlanService {
    constructor(private readonly prisma: DatabaseService) {}

    async createPlan(dietitianId: number, dto: CreateDietPlanDto) {
        const patientProfile = await this.prisma.patientProfile.findUnique({
            where: { id: dto.patientId },
        });

        if (!patientProfile) {
            throw new NotFoundException('Profil pacjenta o ID ${dto.patientId} nie istnieje');
        }

        return this.prisma.dietPlan.create({
            data: {
                title: dto.title,
                description: dto.description,
                duration: dto.duration,
                patientId: dto.patientId,
                authorId: dietitianId,
            },
        });
    }

    async addMeal(dietPlanId: number, dto: AddMealDto) {
        const plan = await this.prisma.dietPlan.findUnique({
            where: { id: dietPlanId },
        });

        if (!plan) {
            throw new NotFoundException(`Plan diety o ID ${dietPlanId} nie istnieje`);
        }

        return this.prisma.planMeal.create({
            data: {
                dietPlanId,
                dayOfWeek: dto.dayOfWeek,
                type: dto.type,
                name: dto.name,
            },
        });
    }

    async addMealItem(planMealId: number, dto: AddMealItemDto) {
        const meal = await this.prisma.planMeal.findUnique({
            where: { id: planMealId },
        });

        if (!meal) {
            throw new NotFoundException('Posiłek o ID ${planMealId} nie istnieje');
        }

        const product = await this.prisma.product.findUnique({
            where: { id: dto.productId },
        });

        if (!product) {
            throw new NotFoundException('Produkt o ID ${dto.productId} nie istnieje');
        }

        return this.prisma.mealItem.create({
            data: {
                planMealId,
                productId: dto.productId,
                amountGrams: dto.amountGrams,
            },
            include: {
                product: true,
            },
        });
    }

    async findPlanById(planId: number) {
        const plan = await this.prisma.dietPlan.findUnique({
            where: { id: planId },
            include: {
                author: {
                    select: { id: true, firstName: true, lastName: true, email: true },
                },
                patient: {
                    include: {
                        user: {
                            select: { id: true, firstName: true, lastName: true, email: true },
                        },
                    },
                },
                meals: {
                    include: {
                        items: {
                            include: {
                                product: true,
                            },
                        },
                    },
                    orderBy: [{ dayOfWeek: 'asc' }, { id: 'asc' } ],
                },
            },
        });

        if (!plan) {
            throw new NotFoundException('Plan diety o ID ${planId} nie istnieje');
        }

        //wyliczenia
        const mealsWithTotals = plan.meals.map((meal) => {
            let mealCalories = 0;
            let mealProtein = 0;
            let mealCarbs = 0;
            let mealFat = 0;

            meal.items.forEach((item) => {
                const factor = item.amountGrams / 100;
                mealCalories += item.product.calories * factor;
                mealProtein += item.product.protein * factor;
                mealCarbs += item.product.carbs * factor;
                mealFat += item.product.fat * factor;
            });

            return {
                ...meal,
                totalNutrients: {
                    calories: Math.round(mealCalories * 10) / 10,
                    protein: Math.round(mealProtein * 10) / 10,
                    carbs: Math.round(mealCarbs * 10) / 10,
                    fat: Math.round(mealFat * 10) / 10,
                },
            };
        });

        return {
            ...plan,
            meals: mealsWithTotals,
        };
    }

    async findPatientPlans(patientProfileId: number) {
        return this.prisma.dietPlan.findMany({
            where: { patientId: patientProfileId },
            include: {
                author: {
                    select: { firstName: true, lastName: true, email: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async removePlan(id: number) {
        await this.findPlanById(id);

        return this.prisma.dietPlan.delete({
            where: { id },
        });
    }
}
