import { PgUserProfileRepository } from '@/infra/repository/postgresql'
import { PostgreSQLUser } from '@/infra/repository/postgresql/entities'
import { makeFakeDb } from '@/tests/infra/gateways/repository/postgresql/mocks'

import { IBackup } from 'pg-mem'
import { getRepository, Repository, getConnection } from 'typeorm'

describe('PgUserProfileRepository', () => {
  let sut: PgUserProfileRepository
  let pgUserRepo: Repository<PostgreSQLUser>
  let backup: IBackup

  beforeAll(async () => {
    const db = await makeFakeDb([PostgreSQLUser])
    backup = db.backup()
    pgUserRepo = getRepository(PostgreSQLUser)
  })

  afterAll(async () => {
    await getConnection().close()
  })

  beforeEach(() => {
    backup.restore()
    sut = new PgUserProfileRepository()
  })

  describe('savePicture', () => {
    it('should update user profile', async () => {
      const { id } = await pgUserRepo.save({ email: 'any_email', initials: 'any_initials' })

      await sut.savePicture({ id: id.toString(), pictureUrl: 'any_url' })
      const pgUser = await pgUserRepo.findOne({ id })

      expect(pgUser).toMatchObject({ id, pictureUrl: 'any_url', initials: null })
    })
  })
})
