import { Request } from 'express'
import { User } from '~/entities'
export type AuthRequest = Request & {
  user: Omit<User, 'password'>
}
