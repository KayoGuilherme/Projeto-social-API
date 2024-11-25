import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ContactDto } from './dto/contact.dto';
import { DoadorService } from 'src/doador/doador.service';

@Injectable()
export class ContactService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly doadorService: DoadorService,
  ) {}

  async saveContact(data: ContactDto) {
    try {
      await this.doadorService.readById(data.doadorId);
      const contact = await this.prisma.contato_Doador.create({ data });

      return true;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Erro interno do servidor' + error);
    }
  }

  async getAllContacts(doadorId: number) {
    await this.doadorService.readById(doadorId);
    const contacts = await this.prisma.contato_Doador.findMany({
      where: {
        doadorId: Number(doadorId),
      },
    });
    return contacts;
  }

  async getContactsPerId(id: number) {
    const contact = await this.prisma.contato_Doador.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!contact) {
      return new NotFoundException(`Id: ${id} not found `);
    }

    return contact;
  }

  async updateContactPerId(id: number, data: ContactDto) {
    try {
      await this.doadorService.readById(data.doadorId);

      await this.getContactsPerId(id);

      await this.prisma.contato_Doador.update({
        where: {
          id: Number(id),
        },
        data,
      });

      return true;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Erro interno do servidor' + error);
    }
  }

  async deleteContactPerId(id: number, doadorId: number) {
    await this.doadorService.readById(doadorId);
    await this.getContactsPerId(id);

    await this.prisma.contato_Doador.delete({
      where: {
        id: Number(id),
      },
    });

    return true;
  }
}
