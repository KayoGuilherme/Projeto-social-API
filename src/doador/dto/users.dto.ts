import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from './enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class DoadorDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  nome: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsBoolean()
  isCompany: boolean;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsBoolean()
  isAnonymous: boolean;

  @ApiProperty({ required: true })
  @IsOptional()
  @IsString()
  @MaxLength(14)
  @MinLength(14)
  cnpj?: string;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsEnum(Role)
  role: Role.doador;

  @ApiProperty({ required: true })
  @IsString()
  @MaxLength(11)
  @MinLength(11)
  CPF: string;
}
