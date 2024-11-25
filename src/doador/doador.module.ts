import { forwardRef, Module } from '@nestjs/common';
import { DoadorService } from './doador.service';
import { DoadorController } from './doador.controller';
import { PrismaClient } from '@prisma/client';
import { AuthModule } from 'src/auth/auth.module';
import { DonationModule } from 'src/donation/donation.module';


@Module({
  imports: [
    forwardRef(() => AuthModule),
    DonationModule
  ],
  controllers: [DoadorController],
  providers: [DoadorService, PrismaClient],
  exports: [DoadorService], 
})
export class DoadorModule {}