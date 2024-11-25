import { Module, forwardRef } from '@nestjs/common';
import { DonationService } from './donation.service';
import { DonationController } from './donation.controller';
import { PrismaClient } from '@prisma/client';
import { DoadorModule } from 'src/doador/doador.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => DoadorModule),
  ],
  controllers: [DonationController],
  providers: [DonationService, PrismaClient],
  exports: [DonationService],
})
export class DonationModule {}