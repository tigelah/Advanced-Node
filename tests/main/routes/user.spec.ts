import { PostgreSQLUser } from '@/infra/repository/postgresql/entities'
import { app } from '@/main/config/app'
import { env } from '@/main/config/env'
import { makeFakeDb } from '@/tests/infra/gateways/repository/postgresql/mocks'

import { IBackup } from 'pg-mem'
import { getConnection, getRepository, Repository } from 'typeorm'
import { sign } from 'jsonwebtoken'
import request from 'supertest'

describe('User Routes', () => {
  describe('DELETE /users/picture', () => {
    let backup: IBackup
    let pgUserRepo: Repository<PostgreSQLUser>

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
    })

    it('should return 403 if authorization header is not present', async () => {
      const { status } = await request(app)
        .delete('/api/users/picture')

      expect(status).toBe(403)
    })
    it('should return 200 with valid data', async () => {
      const { id } = await pgUserRepo.save({ email: 'any_email', name: 'any name' })
      const authorization = sign({ key: id }, env.jwtSecret)

      const { status, body } = await request(app)
        .delete('/api/users/picture')
        .set({ authorization })

      expect(status).toBe(200)
      expect(body).toEqual({ pictureUrl: undefined, initials: 'AN' })
    })
  })
})
