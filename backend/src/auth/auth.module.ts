import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UserModule } from '~/user/user.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '~/entities'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [],
})
export class AuthModule {}
