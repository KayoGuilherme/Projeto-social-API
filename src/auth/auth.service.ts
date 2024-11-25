import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaClient, Doador } from '@prisma/client';
import { DoadorService } from 'src/doador/doador.service';
import { JwtService } from '@nestjs/jwt';
import { DoadorDto } from 'src/doador/dto/users.dto';
import { AuthLoginDto } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly JWTService: JwtService,
    private readonly userService: DoadorService,
    private readonly prisma: PrismaClient,
  ) {}

  createToken(user: Doador) {
    return {
      accessToken: this.JWTService.sign(
        {
          id: user.id,
          name: user.nome,
          CPF: user.CPF,
        },
        {
          secret: String(process.env.JWT_SECRET),
          expiresIn: '50 day',
          subject: String(user.id),
        },
      ),
    };
  }

  checkToken(token: string) {
    try {
      const data = this.JWTService.verify(token, {
        secret: String(process.env.JWT_SECRET),
      });

      return data;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async register(data: DoadorDto) {
    const user = await this.userService.create(data);
    return this.createToken(user);
  }

  async Login({ CPF }: AuthLoginDto) {
    const user = await this.prisma.doador.findFirst({
      where: {
        CPF,
      },
    });

    if (!user) throw new UnauthorizedException('Cpf incorreto');

    return this.createToken(user);
  }
}
