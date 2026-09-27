import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';
import { MealType } from '@prisma/client';

export class AddMealDto {
    @ApiProperty({ example: 1, description: 'Dzień tygodnia (1 = Poniedziałek, 7 = Niedziela)' })
    @IsInt({ message: 'Dzień tygodnia musi być liczbą całkowitą' })
    @Min(1, { message: 'Dzień tygodnia to minimum 1' })
    @Max(7, { message: 'Dzień tygodnia to maksimum 7' })
    dayOfWeek: number;

    @ApiProperty({ enum: MealType, example: MealType.BREAKFAST, description: 'Typ posiłku' })
    @IsEnum(MealType, { message: 'Niepoprawny typ posiłku' })
    type: MealType;

    @ApiProperty({ example: 'Owsianka z owocami', description: 'Nazwa posiłku' })
    @IsString({ message: 'Nazwa posiłku musi być tekstem' })
    @IsNotEmpty({ message: 'Nazwa posiłku jest wymagana' })
    name: string;
}