import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString} from "class-validator";

export class CreatePatientProfileDto {
    @ApiProperty({ example: "2", description: "ID użytkownika" })
    @IsInt({ message: 'userId musi być liczbą całkowitą' })
    @IsNotEmpty({ message: 'userId jest wymagane' })
    userId: number;

    @ApiProperty({ example: "2000-01-01", description: "Data urodzenia pacjenta (RRRR-MM-DD)" })
    @IsDateString({}, { message: 'Podaj poprawny format daty urodzenia (RRRR-MM-DD)' })
    @IsNotEmpty({ message: 'Data urodzenia jest wymagana' })
    birthDate: string;

    @ApiProperty({ example: 182, description: "Wzrost w centymetrach" })
    @IsNumber({}, { message: 'Wzrost musi być liczbą' })
    @IsPositive({ message: 'Wzrost musi być liczbą dodatnią' })
    heightCm: number;

    @ApiProperty({ example: 75.0, description: "Aktualna waga w kilogramach" })
    @IsNumber({}, { message: 'Waga musi być liczbą' })
    @IsPositive({ message: 'Waga musi być liczbą dodatnią' })
    currentWeightKg: number;

    @ApiPropertyOptional({ example: 70.0, description: "Docelowa waga w kilogramach" })
    @IsNumber({}, { message: 'Docelowa waga musi być liczbą' })
    @IsPositive({ message: 'Docelowa waga musi być liczbą dodatnią' })
    targetWeightKg: number;

    @ApiPropertyOptional({ example: 'Alergia na orzechy, cel: redukcja tkanki tłuszczowej', description: 'Notatki dietetyka'})
    @IsOptional()
    @IsString({ message: 'Notatki muszą być tekstem' })
    notes?: string;
}