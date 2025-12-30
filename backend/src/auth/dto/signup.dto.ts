import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator'

export class NewUser {
  @MaxLength(64)
  @IsString()
  @IsNotEmpty()
  firstName: string

  @MaxLength(64)
  @IsString()
  @IsNotEmpty()
  lastName: string

  @IsMobilePhone('vi-VN')
  @IsNotEmpty()
  mobileNumber: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @Matches(
    /^(?=.*[A-Z])(?=.*[~`!@#$%^&*()-_+={}[\]|\\/:;"'<>,.?])(?=.*[0-9])(?=.*[a-z]).{8,}$/,
  )
  @IsString()
  @IsNotEmpty()
  password: string
}
