import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'jan.kowalski@example.com',
    description: 'Adres e-mail użytkownika',
  })
  @IsEmail({}, { message: 'Podaj poprawny adres e-mail' })
  email: string;

  @ApiProperty({
    example: 'Secret123!',
    description: 'Hasło użytkownika',
  })
  @IsString()
  @IsNotEmpty({ message: 'Hasło jest wymagane' })
  password: string;
}
