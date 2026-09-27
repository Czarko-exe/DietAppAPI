import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class AddMealItemDto {
    @ApiProperty({ example: 1, description: 'ID produktu z bazy produktów' })
    @IsInt({ message: 'ID produktu musi być liczbą całkowitą' })
    @IsPositive({ message: 'ID produktu musi być liczbą dodatnią' })
    productId: number;

    @ApiProperty({ example: 100, description: 'Ilość produktu w gramach' })
    @IsInt({ message: 'Ilość produktu musi być liczbą całkowitą' })
    @IsPositive({ message: 'Ilość produktu musi być liczbą dodatnią' })
    amountGrams: number;
}