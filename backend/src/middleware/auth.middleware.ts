import { NestMiddleware, UnauthorizedException } from '@nestjs/common'
import { NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import { ExpiredTokenException, InvalidTokenException } from '~/exceptions'
import { AuthRequest } from './auth.request.type'
import { User } from '~/entities'
export class AuthMiddleware implements NestMiddleware {
  async use(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.headers.authorization) throw new UnauthorizedException()
      const token: string = req.headers.authorization.split(' ')[1]
      if (!token) throw new UnauthorizedException()
      const verifyToken = await jwt.verify(token, process.env.JWT_SECRET_KEY)
      const { id, email } = verifyToken
      req.user = { id, email } as any as User
      next()
    } catch (error) {
      if (error.name === 'JsonWebTokenError' && error.message === 'jwt expired')
        throw new ExpiredTokenException()
      if (error.name === 'JsonWebTokenError') throw new InvalidTokenException()
      throw new UnauthorizedException()
    }
  }
}
