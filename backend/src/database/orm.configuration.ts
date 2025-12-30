import { resolve } from 'path'
import * as dotenv from 'dotenv'
import { DataSource } from 'typeorm'
import { getDataSourceOptions } from './database.configuration'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions.js'

dotenv.config({
  path: resolve(process.cwd(), '.env'),
  override: true,
})


const AppDataSource = new DataSource({
  ...getDataSourceOptions(),
  migrationsTableName: '_migrations_',
  migrations: ['src/database/migrations/*.ts']
})

export default AppDataSource