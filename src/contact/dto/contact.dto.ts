import { IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator"

export class ContactDto {


   
    @IsNotEmpty()
    @IsUrl()
    url: string        

    @IsString()
    @IsNotEmpty()
    tell_contato: string

    @IsNumber()
    @IsNotEmpty()
    doadorId: number    


}
