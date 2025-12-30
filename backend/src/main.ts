import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'
import { AppExceptionFilter, ValidationException } from './exceptions'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })
  const httpAdapter = app.get(HttpAdapterHost)
  const configService = app.get(ConfigService)
  app.useGlobalFilters(new AppExceptionFilter(configService, httpAdapter))
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      enableDebugMessages: true,
      transform: true,
      disableErrorMessages: process.env.NODE_ENV === 'production',
      validationError: { target: false, value: false },
      exceptionFactory: errors => new ValidationException(errors),
    }),
  )
  app.listen(5000, () =>
    console.log('App Is Running With Port 5000...............'),
  )
}
void bootstrap()
