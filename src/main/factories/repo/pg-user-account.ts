import { PostgreSQLAccountRepository } from '@/infra/repository/postgresql'

export const makePgUserAccountRepo = (): PostgreSQLAccountRepository => {
  return new PostgreSQLAccountRepository()
}
