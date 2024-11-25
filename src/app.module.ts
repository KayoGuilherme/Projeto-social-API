import { Module } from '@nestjs/common';
import { DoadorModule } from './doador/doador.module';
import { AuthModule } from './auth/auth.module';
import { DonationModule } from './donation/donation.module';
import { AdressModule } from './Address/adress.module';
import { ContactModule } from './contact/contact.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


@Module({
  imports: [ ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'node_modules', 'swagger-ui-dist'),
    serveRoot: 'swagger',
  }),DoadorModule, AuthModule, DonationModule, AdressModule, ContactModule],

})
export class AppModule {}
 