import { PostgreSQLAccountRepository } from '@/infra/postgresql/repository/user-account'

export const makePgUserAccountRepo = (): PostgreSQLAccountRepository => {
  return new PostgreSQLAccountRepository()
}
