import { IsEmail, IsNotEmpty } from 'class-validator'

export class UserInput {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  password: string
}
