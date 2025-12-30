import {
  ExecutionContext,
  SetMetadata,
  createParamDecorator,
} from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { ROLE } from '~/entities'
import { AuthRequest } from '~/middleware/auth.request.type'
import { PaginationQueryDto } from './pagination.dto'
import { Request } from 'express'

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: AuthRequest = ctx.switchToHttp().getRequest()
    return (request as unknown as { user: unknown }).user
  },
)

export const Pagination = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest()
    const { $sort, $skip = 0, $limit = 20, $select } = request.query
    return plainToInstance(PaginationQueryDto, {
      $sort,
      $skip,
      $limit,
      $select,
    })
  },
)

export const IS_PUBLIC_KEY = 'isPublic'
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)

export const ROLES_KEY = 'roles';
export const Roles = (...roles: ROLE[]) => SetMetadata(ROLES_KEY, roles);