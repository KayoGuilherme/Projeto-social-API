import { SetMetadata } from '@nestjs/common'
import { Role } from 'src/doador/dto/enums/role.enum'



export const Roles = (...roles: Role[]) => SetMetadata('roles', roles) 