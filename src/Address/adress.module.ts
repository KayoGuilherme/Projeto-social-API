import { Module } from '@nestjs/common';
import { AdressService } from './adress.services';
import { PrismaClient } from '@prisma/client';
import { AdressController } from './adress.controller';
import { AuthModule } from '../auth/auth.module';
import { DoadorModule } from 'src/doador/doador.module';

@Module({
  imports: [AuthModule, DoadorModule],
  providers: [AdressService, PrismaClient],
  controllers: [AdressController],
})
export class AdressModule {}
