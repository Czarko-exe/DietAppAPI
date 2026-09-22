import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateProductDto {
    @ApiProperty({ example: 'Pierś z kurczaka', description: 'Nazwa produktu' })
    @IsString({ message: ' Nazwa produktu musi być tekstem' })
    @IsNotEmpty({ message: 'Nazwa produktu nie może być pusta' })
    name: string;

    @ApiProperty({ example: 120, description: 'Kalorie na 100g produktu' })
    @IsNumber({}, { message: 'Kalorie muszą być liczbą' })
    @Min(0, { message: 'Kalorie nie mogą być ujemne' })
    calories: number;

    @ApiProperty({ example: 21.5, description: 'Białko na 100g produktu (w gramach)' })
    @IsNumber({}, { message: 'Białko musi być liczbą' })
    @Min(0, { message: 'Białko nie może być ujemne' })
    protein: number;

    @ApiProperty({ example: 3.6, description: 'Tłuszcz na 100g produktu (w gramach)' })
    @IsNumber({}, { message: 'Tłuszcz musi być liczbą' })
    @Min(0, { message: 'Tłuszcz nie może być ujemny' })
    fat: number;

    @ApiProperty({ example: 0.0, description: 'Węglowodany na 100g produktu (w gramach)' })
    @IsNumber({}, { message: 'Węglowodany muszą być liczbą' })
    @Min(0, { message: 'Węglowodany nie mogą być ujemne' })
    carbs: number;
}