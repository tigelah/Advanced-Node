import { setupChangeProfilePicture, ChangeProfilePicture } from '@/domain/usecases'
import { makeAwsS3FileStorage, makeUniqueId } from '@/main/factories/gateways'
import { makePgUserProfileRepo } from '@/main/factories/repo'

export const makeChangeProfilePicture = (): ChangeProfilePicture => {
  return setupChangeProfilePicture(
    makeAwsS3FileStorage(),
    makeUniqueId(),
    makePgUserProfileRepo()
  )
}
