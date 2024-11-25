import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { DoadorService } from './doador.service';
import { DoadorDto } from './dto/users.dto';
import { AuthGuard } from '../Guards/AuthGuard.guard';
import { Role } from './dto/enums/role.enum';
import { Roles } from '../decorator/role.decorator';
import { Paramid } from '../decorator/Param-id.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/v1/users')
@ApiTags('Controle de Usuarios')
export class DoadorController {
  constructor(private readonly UserService: DoadorService) {}

  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @Get()
  async get() {
    return this.UserService.read();
  }

  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @Get(':id')
  async getbyId(@Paramid() id: number) {
    return this.UserService.readById(id);
  }

  @Post()
  async create(@Body() data: DoadorDto) {
    return this.UserService.create(data);
  }

  @Put(':id')
  async update(@Body() data: DoadorDto, @Paramid() id: number) {
    return this.UserService.update(id, data);
  }

  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  async delete(@Paramid() id: number) {
    return this.UserService.delete(id);
  }
}
