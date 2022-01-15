import { PostgreSQLUser } from '@/infra/repository/postgresql/entities'
import { app } from '@/main/config/app'
import { makeFakeDb } from '@/tests/infra/gateways/repository/postgresql/mocks'

import { IBackup } from 'pg-mem'
import { getConnection } from 'typeorm'
import request from 'supertest'

describe('User Routes', () => {
  describe('DELETE /users/picture', () => {
    let backup: IBackup

    beforeAll(async () => {
      const db = await makeFakeDb([PostgreSQLUser])
      backup = db.backup()
    })

    afterAll(async () => {
      await getConnection().close()
    })

    beforeEach(() => {
      backup.restore()
    })

    it('should return 403 if no authorization header is present', async () => {
      const { status } = await request(app)
        .delete('/api/users/picture')

      expect(status).toBe(403)
    })
  })
})
