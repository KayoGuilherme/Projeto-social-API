import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthLoginDto {
  @ApiProperty({required: true})
  @IsString()
  @MaxLength(14)
  @MinLength(11)
  CPF: string;

}
