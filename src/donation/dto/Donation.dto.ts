import { ApiProperty } from "@nestjs/swagger";
import { Categoria, StatusDoacao } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class DonationDto {

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    titulo: string;
  
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    descricao: string;
  
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsNumber()
    quantidade: number;
  
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsEnum(Categoria)
    categoria: Categoria;
  
    @ApiProperty({ required: true })
    @IsOptional()
    @IsEnum(StatusDoacao)
    status?: StatusDoacao = StatusDoacao.AGUARDANDO;
  
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsNumber()
    doadorId: number;

}
