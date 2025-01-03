import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { AdressDTO } from "./dto/adress-create.dto";
import { DoadorService } from "src/doador/doador.service";

const LINE_AFFECTED = 1;

@Injectable()
export class AdressService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly usersService: DoadorService
  ) {
  }

  async saveAdress(data: AdressDTO, userId: number) {
    const user = await this.usersService.readById(userId);

    const adress = await this.prisma.adressDoador.create({
      data: {
        ...data,
        userId: user.id
      }
    });

    return adress;
  }

  async getAdress(userId: number) {
    try {
      const adress = await this.prisma.adressDoador.findMany({
        where: {
          userId
        }
      });
      return adress;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        "Não foi possivel visualizar o endereço do usuario"
      );
    }
  }

  async updateAdress(
    id: number,
    userId: number,
    {
      CEP,
      bairro,
      cidade,
      complemento,
      estado,
      numero,
      ponto_de_referencia,
      telefone_contato,
      Rua
    }: AdressDTO
  ) {
    const user = await this.usersService.readById(userId);

    try {
      const address = await this.prisma.adressDoador.findFirst({
        where: {
          id: Number(id),
          userId: user.id
        }
      });

      if (!address)
        return new NotFoundException(
          "Endereço não encontrado na base de dados"
        );

      await this.prisma.adressDoador.update({
        where: {
          id: Number(id)
        },
        data: {
          CEP,
          bairro,
          cidade,
          complemento,
          estado,
          numero,
          ponto_de_referencia,
          telefone_contato,
          Rua,
          userId: user.id
        }
      });


      return { sucess: true };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        "não foi possivel atualizar informações de endereço, por favor atualize a pagina e tente novamente.",
        error
      );
    }
  }

  async deleteAdress(id: number, userId: number) {
    await this.usersService.readById(userId);

    try {
      const adress = await this.prisma.adressDoador.delete({
        where: {
          id
        }
      });

      return {
        row: [],
        LINE_AFFECTED
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        "não foi possivel deletar endereço, por favor tente novamente."
      );
    }
  }
}
