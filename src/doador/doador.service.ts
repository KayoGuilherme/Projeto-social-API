import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { DoadorDto } from './dto/users.dto';

@Injectable()
export class DoadorService {
  constructor(private readonly prisma: PrismaClient) {}

  async read() {
    return this.prisma.doador.findMany();
  }

  async readById(id: number) {
    const usuarioExist = await this.prisma.doador.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!usuarioExist) {
      throw new NotFoundException('Usuario do id: ' + id);
    }

    return await this.prisma.doador.findFirst({
      where: {
        id: Number(id),
      },
    });
  }

  async create(data: DoadorDto) {
    const CpfUserExiste = await this.prisma.doador.findFirst({
      where: {
        CPF: data.CPF,
      },
    });
    
    if (CpfUserExiste)
      throw new NotFoundException('Já existe um usuario com esse cpf.');

    const user = await this.prisma.doador.create({ data });

    return user;
  }

  async update(
    id: number,
    { isCompany, nome, cnpj, CPF, isAnonymous }: DoadorDto,
  ) {
    try {
      const usuarioExist = await this.prisma.doador.findFirst({
        where: {
          id: Number(id),
        },
      });

      if (!usuarioExist)
        throw new NotFoundException(`Esse Usuario do id:${id} não existe`);

      return this.prisma.doador.update({
        where: {
          id: Number(id),
        },
        data: {
          isCompany,
          nome,
          cnpj,
          CPF,
          isAnonymous,
        },
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        'não foi possivel atualizar informações do usúario.',
      );
    }
  }

  async delete(id: number) {
    const usuarioExist = await this.prisma.doador.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!usuarioExist)
      throw new NotFoundException(`Esse usuario do id: ${id} não existe`);

    await this.prisma.doador.delete({
      where: {
        id: Number(id),
      },
    });

    return true;
  }
}
