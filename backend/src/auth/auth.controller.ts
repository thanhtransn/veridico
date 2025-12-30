import { Body, Controller, Injectable, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserInput } from './dto/signin.dto'
import { NewUser } from './dto/signup.dto'
import { Public } from '~/utils/decorators'

@Injectable()
@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('sign-in')
  async signIn(@Body() userInput: UserInput) {
    return await this.authService.singIn(userInput)
  }

  @Post('sign-up')
  async signUp(@Body() newUser: NewUser) {
    return await this.authService.signUp(newUser)
  }
}
