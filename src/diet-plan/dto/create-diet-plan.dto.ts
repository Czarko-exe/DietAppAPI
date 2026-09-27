import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateDietPlanDto {
    @ApiProperty({ example: 'Dieta redukcyjna 2000kcal', description: 'Tytuł jadłospisu' })
    @IsString({ message: 'Tytuł musi być napisem' })
    @IsNotEmpty({ message: 'Tytuł jest wymagany' })
    title: string;

    @ApiProperty({ example: 'Plan 4-posiłkowy z ograniczeniem cukrów prostych', description: 'Opis jadłospisu' })
    @IsString({ message: 'Opis musi być tekstem' })
    @IsNotEmpty({ message: 'Opis jest wymagany' })
    description: string;

    @ApiProperty({ example: '4 tygodnie', description: 'Czas trwania planu' })
    @IsString({ message: 'Czas trwania musi być tekstem' })
    @IsNotEmpty({ message: 'Czas trwania jest wymagany' })
    duration: string;

    @ApiProperty({example: 1, description: 'ID profilu pacjenta' })
    @IsInt({ message: 'ID pacjenta musi być liczbą całkowitą' })
    @IsPositive({ message: 'ID pacjenta musi być liczbą dodatnią' })
    patientId: number;
}