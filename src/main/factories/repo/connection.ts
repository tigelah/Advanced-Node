import { PgConnection } from '@/infra/repository/postgresql/helpers'

export const makePgConnection = (): PgConnection => {
  return PgConnection.getInstance()
}
