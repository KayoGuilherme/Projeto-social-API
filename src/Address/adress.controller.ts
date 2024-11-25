import { Body, Controller, Delete, Get, Post, Put, UseGuards } from "@nestjs/common";
import { AdressDTO } from "./dto/adress-create.dto";
import { Paramid } from "../decorator/Param-id.decorator";
import { AdressService } from "./adress.services";
import { AuthGuard } from "../Guards/AuthGuard.guard";
import { User } from "../decorator/user.decorator";
import { ApiTags } from "@nestjs/swagger";


@Controller("api/v1/endereco")
@ApiTags("Controle de endereços")
export class AdressController {
  constructor(private readonly adressService: AdressService) {
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAdress(@User() enderecoId: number) {
    return this.adressService.getAdress(enderecoId);
  }

  @UseGuards(AuthGuard)
  @Post()
  async saveAdress(@User() userId: number, @Body() data: AdressDTO) {
    return this.adressService.saveAdress(data, Number(userId));
  }

  @UseGuards(AuthGuard)
  @Put(":id")
  async updateAdress(@Body() data: AdressDTO, @Paramid() id: number, @User() userId: number) {
    return this.adressService.updateAdress(id, userId, data);
  }

  @UseGuards(AuthGuard)
  @Delete(":id")
  async deleteAdress(@Paramid() id: number, @User() userId: number) {
    return this.adressService.deleteAdress(id, userId);
  }
}
