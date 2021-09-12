import { LoadUserAccountRepository } from '@/data/contracts/repository'

import { IBackup, newDb } from 'pg-mem'
import { Entity, PrimaryGeneratedColumn, Column, getRepository, Repository, getConnection } from 'typeorm'

export class PostgreSQLAccountRepository implements LoadUserAccountRepository {
  async load (params: LoadUserAccountRepository.Params): Promise<LoadUserAccountRepository.Result> {
    const pgUserRepo = getRepository(PostgreSQLUser)
    const pgUser = await pgUserRepo.findOne({ email: params.email })

    if (pgUser !== undefined) {
      return {
        id: pgUser?.id.toString(),
        name: pgUser?.name ?? undefined
      }
    }
  }
}

@Entity({ name: 'tb_usuarios' })
class PostgreSQLUser {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: 'nome', nullable: true })
  name?: string

  @Column()
  email!: string

  @Column({ name: 'id_facebook', nullable: true })
  facebookId?: string
}

describe('PostgreSQLAccountRepository', () => {
  describe('load', () => {
    let sut: PostgreSQLAccountRepository
    let pgUserRepo: Repository<PostgreSQLUser>
    let backup: IBackup

    beforeAll(async () => {
      const db = newDb()
      const connection = await db.adapters.createTypeormConnection({
        type: 'postgres',
        entities: [PostgreSQLUser]
      })
      await connection.synchronize()
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
      const sut = new PostgreSQLAccountRepository()

      const account = await sut.load({ email: 'new_email' })

      expect(account).toBeUndefined()
    })
  })
})
