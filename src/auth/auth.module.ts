import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { DoadorModule } from 'src/doador/doador.module';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [
    JwtModule.register({
      secret: String(process.env.JWT_SECRET),
    }),
    forwardRef(() => DoadorModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaClient],
  exports: [AuthService], 
})
export class AuthModule {}