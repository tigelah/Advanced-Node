import { LoadUserAccountRepository, SaveFacebookAccountRepository } from '@/domain/contracts/repository'
import { PostgreSQLUser } from '@/infra/postgresql/entities'

import { getRepository } from 'typeorm'

export class PostgreSQLAccountRepository implements LoadUserAccountRepository, SaveFacebookAccountRepository {
  async load ({ email }: LoadUserAccountRepository.Input): Promise<LoadUserAccountRepository.Output> {
    const pgUserRepo = getRepository(PostgreSQLUser)
    const pgUser = await pgUserRepo.findOne({ email })

    if (pgUser !== undefined) {
      return {
        id: pgUser.id.toString(),
        name: pgUser.name ?? undefined
      }
    }
  }

  async saveWithFacebook ({ id, name, email, facebookId }: SaveFacebookAccountRepository.Input): Promise<SaveFacebookAccountRepository.Output> {
    const pgUserRepo = getRepository(PostgreSQLUser)
    let resultId: string
    if (id === undefined) {
      const pgUser = await pgUserRepo.save({ email, name, facebookId })
      resultId = pgUser.id.toString()
    } else {
      resultId = id
      await pgUserRepo.update({ id: parseInt(id) }, { name, facebookId })
    }
    return { id: resultId }
  }
}
