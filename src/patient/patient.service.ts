import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreatePatientProfileDto } from './dto/create-patient-profile.dto';
import { UpdatePatientProfileDto } from './dto/update-patient-profile.dto';
import { Role } from '@prisma/client';

@Injectable()
export class PatientService {
    constructor(private readonly prisma: DatabaseService) {}

    async createProfile(dietitianId: number, dto: CreatePatientProfileDto) {
        const user = await this.prisma.user.findUnique({
            where: { id: dto.userId },
            include: { patientProfile: true },
        });

        if (!user) {
            throw new NotFoundException(`Użytkownik o ID ${dto.userId} nie istnieje`);
        }

        if (user.role !== Role.PATIENT) {
            throw new ForbiddenException(`Profil pacjenta można utworzyć tylko dla użytkownika o roli PATIENT`);
        }

        if (user.patientProfile) {
            throw new ConflictException(`Profil pacjenta dla użytkownika o ID ${dto.userId} już istnieje`);
        }

        return this.prisma.patientProfile.create({
            data: {
                userId: dto.userId,
                dietitianId: dietitianId,
                birthDate: new Date(dto.birthDate),
                heightCm: dto.heightCm,
                currentWeightKg: dto.currentWeightKg,
                targetWeightKg: dto.targetWeightKg,
                notes: dto.notes,
            },
            include: {
                user: {
                    select: { id: true, email: true, firstName: true, lastName: true },
                },
            },
        });
    }

    async findAllMyPatients(dietitianId: number) {
        return this.prisma.patientProfile.findMany({
            where: { dietitianId },
            include: {
                user: {
                    select: { id: true, email: true, firstName: true, lastName: true },
                },
            },
            orderBy: { id: 'desc'},
        });
    }

    async findOne(id:number) {
        const profile = await this.prisma.patientProfile.findUnique({
            where: { id },
            include: {
                user: {
                    select: { id: true, email: true, firstName: true, lastName: true },
                },
                dietitian: {
                    select: { id: true, email: true, firstName: true, lastName: true },
                },
            },
        });

        if (!profile) {
            throw new NotFoundException(`Profil pacjenta o ID ${id} nie istnieje`);
        }

        return profile;
    }

    async update(id: number, dto: UpdatePatientProfileDto) {
        await this.findOne(id);

        return this.prisma.patientProfile.update({
            where: { id },
            data: {
                birthDate: dto.birthDate ? new Date(dto.birthDate) : undefined,
            },
        });
    }
}
