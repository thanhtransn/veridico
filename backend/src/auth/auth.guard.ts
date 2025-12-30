import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLE } from '~/entities'
import { AuthRequest } from '~/middleware'
import { UserService } from '~/user/user.service'
import { IS_PUBLIC_KEY, ROLES_KEY } from '~/utils/decorators'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const getMetadata = <T>(key: string) =>
      this.reflector.getAllAndOverride<T>(key, [
        context.getHandler(),
        context.getClass(),
      ])

    const isPublic = getMetadata<boolean>(IS_PUBLIC_KEY) ?? false
    if (isPublic) {
      return true
    }

    const request: AuthRequest = context.switchToHttp().getRequest()
    const user = await this.userService.findById(request.user.id)
    const allowedRole = getMetadata<ROLE[]>(ROLES_KEY)
    if (user) {
      request.user = user
      return allowedRole?.length ? allowedRole.includes(user.role) : true
    }
    return false
  }
}
