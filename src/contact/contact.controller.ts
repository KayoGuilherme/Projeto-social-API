import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { User } from 'src/decorator/user.decorator';
import { Paramid } from 'src/decorator/Param-id.decorator';
import { AuthGuard } from 'src/Guards/AuthGuard.guard';
import { RoleGuard } from 'src/Guards/role.guard';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/doador/dto/enums/role.enum';
import { ContactDto } from './dto/contact.dto';

@UseGuards(AuthGuard, RoleGuard)
@Controller('api/v1/contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Roles(Role.Admin, Role.doador)
  @Get()
  async getAllContacts(@User() doadorId: number) {
    return this.contactService.getAllContacts(doadorId);
  }

  @Roles(Role.Admin, Role.doador)
  @Get(':id')
  async getContactPerId(@Paramid() id: number) {
    return this.contactService.getContactsPerId(id);
  }

  @Roles(Role.doador)
  @Post()
  async saveContact(@Body() data: ContactDto, @User() doadorId: number) {
    return this.contactService.saveContact(data);
  }

  @Put(':id')
  async updateContactPerId(@Paramid() id: number, @Body() data: ContactDto) {
    return this.contactService.updateContactPerId(id, data);
  }

  @Delete(':id')
  async deleteContactPerId(@Paramid() id: number, @User() doadorId: number) {
    return this.contactService.deleteContactPerId(id, doadorId);
  }
}
