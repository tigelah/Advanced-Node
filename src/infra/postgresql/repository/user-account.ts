import { LoadUserAccountRepository, SaveFacebookAccountRepository } from '@/data/contracts/repository'
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

  async saveWithFacebook (params: SaveFacebookAccountRepository.Params): Promise<void> {
    const pgUserRepo = getRepository(PostgreSQLUser)
    if (params.id === undefined) {
      await pgUserRepo.save({
        email: params.email,
        name: params.name,
        facebookId: params.facebookId
      })
    } else {
      await pgUserRepo.update({
        id: parseInt(params.id)
      }, {
        name: params.name,
        facebookId: params.facebookId
      })
    }
  }
}
