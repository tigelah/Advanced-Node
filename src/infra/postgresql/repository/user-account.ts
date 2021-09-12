import { LoadUserAccountRepository } from '@/data/contracts/repository'
import { PostgreSQLUser } from '@/infra/postgresql/entities'

import { getRepository } from 'typeorm'

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
