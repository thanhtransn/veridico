import { Controller, Get, Injectable, Put } from '@nestjs/common'
import { ROLE, User } from '~/entities'
import { CurrentUser, Roles } from '~/utils/decorators'
import { UserService } from './user.service'

@Injectable()
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Get('my-profile')
  async getProfile(@CurrentUser() user: User) {
    return user
  }

  @Put('update-profile')
  async updateProfile(@CurrentUser() user: User) {
    return this.userService.update({role: ROLE.SUPERADMIN}, user)
  }

  @Roles(ROLE.SUPERADMIN)
  @Get('list-valid-user-tobe-adminstrator')
  async getValidUserToAdminstratorList() {
    return await this.userService.findValidUserToAdminstratorList()
  }
}
