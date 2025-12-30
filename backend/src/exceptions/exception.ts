import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  UnauthorizedException,
  ValidationError,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { HttpAdapterHost } from '@nestjs/core'
import { AppError, ERROR_CODE } from './constants'

export class ValidationException extends BadRequestException {
  constructor(errors: ValidationError[]) {
    super({
      code: ERROR_CODE.VALIDATION_ERROR,
      errors,
    })
  }
}
export class UserExistedException extends BadRequestException {
  constructor() {
    super({
      code: ERROR_CODE.USER_EXISTED,
      debug: 'This email has been signed up! please use other email !!!',
    })
  }
}

export class UserNotFoundException extends BadRequestException {
  constructor() {
    super({
      code: ERROR_CODE.USER_NOT_FOUND,
      debug: 'User Not Found',
    })
  }
}

export class UserNotAllowedException extends BadRequestException {
  constructor() {
    super({
      code: ERROR_CODE.USER_NOT_ALLOWED,
      debug: 'You Are Not Allowed To Vote This Operation',
    })
  }
}

export class AdministratorListNotAllowedException extends BadRequestException {
  constructor() {
    super({
      code: ERROR_CODE.ADMININSTRATOR_LIST_NOT_ALLOWED,
      debug: 'administrator list is not allowed',
    })
  }
}

export class OrganistionNotFoundException extends BadRequestException {
  constructor() {
    super({
      code: ERROR_CODE.ORGANISATION_NOT_FOUND,
      debug: 'Organistion Not Found',
    })
  }
}

export class OrganistionAlreadyExistedException extends BadRequestException {
  constructor() {
    super({
      code: ERROR_CODE.ORGANISATION_IS_EXISTED,
      debug: 'Organistion Is Existed',
    })
  }
}


export class ExpiredTokenException extends UnauthorizedException {
  constructor() {
    super({
      code: ERROR_CODE.TOKEN_EXPIRED,
      debug: 'token is expired',
    })
  }
}

export class InvalidTokenException extends UnauthorizedException {
  constructor() {
    super({
      code: ERROR_CODE.TOKEN_INVALID,
      debug: 'token is invalid',
    })
  }
}

export class UnauthorizedUserException extends UnauthorizedException {
  constructor() {
    super({
      code: ERROR_CODE.CREDENTIAL_INCORRECT,
      debug: 'User Credential Is Incorrect',
    })
  }
}
@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost
    const ctx = host.switchToHttp()
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR
    const payload =
      exception instanceof HttpException
        ? (exception.getResponse() as AppError)
        : {
            code: ERROR_CODE.INTERNAL_SERVER_ERROR,
            message: 'Some thing went wrong!',
            debug: exception,
          }
    this.configService.get<boolean>('app.isProduction') && delete payload.debug

    httpAdapter.reply(ctx.getResponse<Response>(), payload, httpStatus)
  }
}
