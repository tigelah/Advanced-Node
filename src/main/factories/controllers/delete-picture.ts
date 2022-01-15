import { makeChangeProfilePicture } from '@/main/factories/usecases'
import { DeletePictureController } from '@/application/controllers'

export const makeDeletePictureController = (): DeletePictureController => {
  return new DeletePictureController(makeChangeProfilePicture())
}
