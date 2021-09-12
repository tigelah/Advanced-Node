
import { PostgreSQLUser } from '@/infra/postgresql/entities'
import { PostgreSQLAccountRepository } from '@/infra/postgresql/repository'

import { IBackup } from 'pg-mem'
import { getRepository, Repository, getConnection } from 'typeorm'
import { makeFakeDb } from '@/tests/infra/postgresql/mocks'

describe('PostgreSQLAccountRepository', () => {
  describe('load', () => {
    let sut: PostgreSQLAccountRepository
    let pgUserRepo: Repository<PostgreSQLUser>
    let backup: IBackup

    beforeAll(async () => {
      const db = await makeFakeDb([PostgreSQLUser])
      backup = db.backup()
      pgUserRepo = getRepository(PostgreSQLUser)
    })

    beforeEach(() => {
      backup.restore()
      sut = new PostgreSQLAccountRepository()
    })

    afterAll(async () => {
      await getConnection().close()
    })

    it('should return an account if email exists', async () => {
      await pgUserRepo.save({ email: 'existing_email' })

      const account = await sut.load({ email: 'existing_email' })

      expect(account).toEqual({ id: '1' })
    })

    it('should return undefined if email does not exists', async () => {
      const account = await sut.load({ email: 'new_email' })

      expect(account).toBeUndefined()
    })
  })
})
