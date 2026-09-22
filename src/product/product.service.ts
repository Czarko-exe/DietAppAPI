import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService} from "../database/database.service";
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
    constructor(private readonly prisma: DatabaseService) {}

    async findAll(search?: string) {
        if (search) {
            return this.prisma.product.findMany({
                where: {
                    name: {
                        contains: search,
                        mode: 'insensitive',
                    },
                },
                orderBy: { name: 'asc' },
            });
        }
        return this.prisma.product.findMany({
            orderBy: { name: 'asc'},
        });
    }

    async findOne(id: number) {
        const product = await this.prisma.product.findUnique({
            where: { id },
        });

        if (!product) {
            throw new NotFoundException(`Produkt o ID ${id} nie został znaleziony`);
        }
        return product;
    }

    async create(dto: CreateProductDto) {
        return this.prisma.product.create({
            data: dto,
        });
    }

    async update(id: number, dto: UpdateProductDto) {
        await this.findOne(id);

        return this.prisma.product.update({
            where: { id },
            data: dto,
        });
    }

    async remove(id: number) {
        await this.findOne(id);

        return this.prisma.product.delete({
            where: { id },
        });
    }
}
