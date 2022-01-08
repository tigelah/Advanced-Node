import { PostgreSQLUser } from '@/infra/repository/postgresql/entities'
import { LoadUserProfile, SaveUserPicture } from '@/domain/contracts/repository'

import { getRepository } from 'typeorm'

export class PgUserProfileRepository implements SaveUserPicture, LoadUserProfile {
  async savePicture ({ id, pictureUrl, initials }: SaveUserPicture.Input): Promise<void> {
    const pgUserRepo = getRepository(PostgreSQLUser)
    await pgUserRepo.update({ id: parseInt(id) }, { pictureUrl, initials })
  }

  async load ({ id }: LoadUserProfile.Input): Promise<LoadUserProfile.Output> {
    const pgUserRepo = getRepository(PostgreSQLUser)
    const pgUser = await pgUserRepo.findOne({ id: parseInt(id) })
    if (pgUser !== undefined) return { name: pgUser.name }
  }
}
