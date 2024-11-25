import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { DonationService } from './donation.service';
import { DonationDto } from './dto/Donation.dto';
import { AuthGuard } from 'src/Guards/AuthGuard.guard';
import { ApiTags } from '@nestjs/swagger';
import { Paramid } from 'src/decorator/Param-id.decorator';




@UseGuards(AuthGuard)
@ApiTags("Controle de doações")
@Controller('api/v1/donation')
export class DonationController {
  constructor(private readonly donationService: DonationService) {}


  
  @Get()
  async getAllDonates() {
    return this.donationService.getAllDonates();
  }

  @Get(":id")
  async getDonatePerId(@Paramid() id: number){
    return this.donationService.getDonatesById(id);
  }


  @Post()
  async saveDonate(@Body() data: DonationDto) {
    return this.donationService.saveDonate(data);
  }

  @Put(":id")
  async updateDonatePerId(@Body() {categoria, descricao, doadorId, quantidade, titulo}: DonationDto, @Paramid() id: number){
    return this.donationService.updateDonatesById({ categoria, descricao, doadorId, quantidade, titulo}, id);
  }

  @Delete("id")
  async deleteDonationPerId(@Paramid()  id: number) {
    return this.donationService.deleteDonateById(id);
  }

  @Patch("status/delivered/:id")
  async updateStatusDonatePerId( @Paramid() id: number){
    return this.donationService.updateStatusToDeliveredDonate(id);
  }

  @Patch("status/cancel/:id")
  async updateStatusToCancelDonatePerId( @Paramid() id: number){
    return this.donationService.updateStatusToCanceledDeliveredDonate(id);
  }
  
}
