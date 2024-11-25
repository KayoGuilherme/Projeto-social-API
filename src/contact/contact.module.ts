import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { PrismaClient } from '@prisma/client';
import { AuthModule } from 'src/auth/auth.module';
import { DoadorModule } from 'src/doador/doador.module';

@Module({
  imports: [AuthModule, DoadorModule],
  controllers: [ContactController],
  providers: [ContactService, PrismaClient],
})
export class ContactModule {}
