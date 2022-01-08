import { PostgreSQLUser } from '@/infra/repository/postgresql/entities'
import { SaveUserPicture } from '@/domain/contracts/repository'

import { getRepository } from 'typeorm'

export class PgUserProfileRepository implements SaveUserPicture {
  async savePicture ({ id, pictureUrl, initials }: SaveUserPicture.Input): Promise<void> {
    const pgUserRepo = getRepository(PostgreSQLUser)
    await pgUserRepo.update({ id: parseInt(id) }, { pictureUrl, initials })
  }
}
