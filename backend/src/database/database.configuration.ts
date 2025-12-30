import { registerAs } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Organisation, User, } from 'src/entities'
import { DataSourceOptions } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

export const getDataSourceOptions = (): DataSourceOptions => ({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    database: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    synchronize: false,
    entities: [User, Organisation],
    namingStrategy: new SnakeNamingStrategy(),
    ssl: process.env.POSTGRES_SSL === 'true',
    extra: {
      ssl:
        process.env.POSTGRES_SSL === 'true'
          ? { rejectUnauthorized: false }
          : undefined,
    },
})
export const databaseConfig = registerAs('typeorm', (): TypeOrmModuleOptions => {
  return {...getDataSourceOptions(), autoLoadEntities: true}
})