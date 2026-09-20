import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import {
  ApiProperty,
  ApiPropertyOptional
} from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class RegisterDto {
  @ApiProperty({
    example: 'jan.kowalski@example.com',
    description: 'Adres e-mail użytkownika',
  })
  @IsEmail({}, { message: 'Podaj poprawny adres e-mail' })
  email: string;

  @ApiProperty({
    example: 'Secret123!',
    description: 'Hasło użytkownika (min. 6 znaków)',
    minLength: 6,
  })
  @IsString()
  @MinLength(6, { message: 'Hasło musi mieć co najmniej 6 znaków' })
  password: string;

  @ApiProperty({
    example: 'Jan',
    description: 'Imię użytkownika',
  })
  @IsString()
  @IsNotEmpty({ message: 'Imię jest wymagane' })
  firstName: string;
  
  @ApiProperty({
    example: 'Kowalski',
    description: 'Nazwisko użytkownika',
  })
  @IsString()
  @IsNotEmpty({ message: 'Nazwisko jest wymagane' })
  lastName: string;
  
  @ApiPropertyOptional({
    enum: Role,
    default: Role.PATIENT,
    description: 'Rola użytkownika (DIETITIAN lub PATIENT)',
  })
  @IsOptional()
  @IsEnum(Role, { message: 'Rola musi mieć wartość DIETITIAN lub PATIENT'})
  role?: Role;
}
