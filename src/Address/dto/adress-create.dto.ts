import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';

export class AdressDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(8)
  CEP: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  numero: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  complemento: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  ponto_de_referencia: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  bairro: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  estado: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  cidade: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(11)
  @MaxLength(11)
  telefone_contato: string;

  @ApiProperty({ required: true })
  userId: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  Rua: string;
}
