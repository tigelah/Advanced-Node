import { PgUserProfileRepository } from '@/infra/repository/postgresql'

export const makePgUserProfileRepo = (): PgUserProfileRepository => {
  return new PgUserProfileRepository()
}
