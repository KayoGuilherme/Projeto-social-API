import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { DoadorDto } from 'src/doador/dto/users.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/v1/auth')
@ApiTags("Controle de autenticação")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async Login(@Body() { CPF }: AuthLoginDto) {
    return this.authService.Login({ CPF });
  }

  @Post('registrar')
  async register(@Body() data: DoadorDto) {
    return this.authService.register(data);
  }
}
