import { ConnectionOptions } from 'typeorm'

export const config: ConnectionOptions = {
  type: 'postgres',
  host: 'kesavan.db.elephantsql.com',
  port: 5432,
  username: 'obogpcat',
  password: 'f9tfqrSgjCYXEEmfW4o_ms_qAeOHbThy',
  database: 'obogpcat',
  entities: ['dist/infra/postgresql/entities/index.js']
}
