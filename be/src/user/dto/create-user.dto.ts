import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
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
  @MinLength(10, {
    message: 'Password should be at least 8 characters',
  })
  password: string;

  @ApiProperty({
    description: 'User Name',
    example: 'Daniil',
    type: 'string',
  })
  name: string;

  @ApiPropertyOptional({
    description: 'User Second Name',
    example: 'Frei',
    type: 'string',
  })
  @IsOptional()
  @IsString()
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
