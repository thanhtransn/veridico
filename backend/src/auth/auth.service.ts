import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { NewUser } from './dto/signup.dto'
import { UserService } from '~/user/user.service'
import { UserInput } from './dto/signin.dto'
import { ConfigService } from '@nestjs/config'
import { UnauthorizedUserException } from '~/exceptions'
import { ROLE } from '~/entities'

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly userService: UserService,
  ) {}

  async singIn(user: UserInput) {
    const { email, password } = user

    const validUser = await this.userService.findByEmail(email)
    const isValidPassword = await bcrypt.compare(
      password,
      validUser.password,
    )
    if (!isValidPassword) throw new UnauthorizedUserException()
    const { id } = validUser
    const accessToken = await jwt.sign(
      { id, email },
      this.config.get<string>('JWT_SECRET_KEY'),
      { expiresIn: 60 * 60 },
    )
    return { token: accessToken, expiresIn: 3600 }
  }

  async signUp(newUser: NewUser) {
    const { email, password, firstName, lastName, mobileNumber } = newUser
    await this.userService.checkUserExisted(email)
    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(password, salt)

    const createdUser = await this.userService.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email,
      password: hashPassword,
      mobileNumber: mobileNumber,
      role: ROLE.USER,
      isActive: true
    })
    return createdUser?.id
  }
}
