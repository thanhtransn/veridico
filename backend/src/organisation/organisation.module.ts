import { Module } from '@nestjs/common'
import { OrganisationService } from './organisation.service'
import { OrganisationController } from './organisation.controller'
import { Organisation } from '~/entities'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserService } from '~/user/user.service'
import { UserModule } from '~/user/user.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Organisation]),
    UserModule
  ],
  controllers: [OrganisationController],
  providers: [OrganisationService],
  exports: [OrganisationService],
})
export class OrganisationModule {}
