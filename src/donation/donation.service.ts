import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DonationDto } from './dto/Donation.dto';
import {  PrismaClient, StatusDoacao } from '@prisma/client';
import { DoadorService } from 'src/doador/doador.service';

@Injectable()
export class DonationService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly doadorService: DoadorService,
  ) {}

  async saveDonate(data: DonationDto) {
    try {
      const doador = await this.doadorService.readById(data.doadorId);

      if (!doador) {
        return new NotFoundException(
          'DoadorId não encontrado: ' + data.doadorId,
        );
      }

      await this.prisma.doacao.create({
        data,
      });

      return true;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Erro interno no servidor : ' + error);
    }
  }

  async getAllDonates() {
    const donates = await this.prisma.doacao.findMany();
    return donates;
  }

  async getDonatesById(id: number) {
    const donate = this.prisma.doacao.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!donate) return new NotFoundException('Id não encontrado: ' + id);

    return donate;
  }

  async updateDonatesById(
    { categoria, descricao, doadorId, quantidade, titulo }: DonationDto,
    id: number,
  ) {
    try {
      await this.getDonatesById(id);

      await this.prisma.doacao.update({
        where: {
          id: Number(id),
        },
        data: {
          titulo,
          categoria,
          descricao,
          quantidade,
          doadorId,
        },
      });

      return true;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Erro interno do servidor: ' + error);
    }
  }

  async deleteDonateById(id: number) {
    await this.getDonatesById(id);

    await this.prisma.doacao.delete({
      where: {
        id: Number(id),
      },
    });

    return true;
  }

  async updateStatusToDeliveredDonate(id: number) {
    await this.getDonatesById(id);

    await this.prisma.doacao.update({
      where: {
        id: Number(id),
      },
      data: {
        status: StatusDoacao.ENTREGUE,
      },
    });

    return true
  }


  async updateStatusToCanceledDeliveredDonate(id: number) {
    await this.getDonatesById(id);

    await this.prisma.doacao.update({
      where: {
        id: Number(id),
      },
      data: {
        status: StatusDoacao.CANCELADA,
      },
    });

    return true;
  }

}
