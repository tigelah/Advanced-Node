import { makeChangeProfilePicture } from '@/main/factories/usecases'
import { SavePictureController } from '@/application/controllers'

export const makeSavePictureController = (): SavePictureController => {
  return new SavePictureController(makeChangeProfilePicture())
}
