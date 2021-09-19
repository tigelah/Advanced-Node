import { ConnectionOptions } from 'typeorm'

export const config: ConnectionOptions = {
  type: 'postgres',
  host: 'kesavan.db.elephantsql.com',
  port: 5432,
  username: 'tsnagqfp',
  password: 'Orzr5roCcz7Zjby50RPwBfdhao8ZvgAY',
  database: 'tsnagqfp ',
  entities: ['dist/infra/postgres/entities/index.js']
}
