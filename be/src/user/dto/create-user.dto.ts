import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'User Email',
    example: 'email@example.com',
    type: 'string',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User Password',
    example: 'password',
    type: 'string',
    minLength: 8,
  })
  @IsString()
  @MinLength(8, {
    message: 'password should be at least 8 characters',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, {
    message: `Your password must meet the following criteria:
    - At least 8 characters long
    - Contains at least one uppercase letter (A-Z)
    - Contains at least one lowercase letter (a-z)
    - Contains at least one digit (0-9)`,
  })
  password: string;

  @ApiProperty({
    description: 'User Name',
    example: 'Daniil',
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z\s]+$/, {
    message:
      'Name must contain only letters and spaces (no numbers or special characters)',
  })
  name: string;

  @ApiPropertyOptional({
    description: 'User Second Name',
    example: 'Frei',
    type: 'string',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z\s]+$/, {
    message:
      'Name must contain only letters and spaces (no numbers or special characters)',
  })
  secondName?: string;

  @ApiPropertyOptional({
    description: 'User BirthDate',
    example: 'Frei',
    type: 'string',
  })
  @IsOptional()
  @IsDateString()
  birthDate?: Date;
}
