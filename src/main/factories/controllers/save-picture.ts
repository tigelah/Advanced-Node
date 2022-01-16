import { makeChangeProfilePicture } from '@/main/factories/usecases'
import { SavePictureController, Controller } from '@/application/controllers'
import { makePgTransactionController } from '@/main/factories/decorators'

export const makeSavePictureController = (): Controller => {
  const controller = new SavePictureController(makeChangeProfilePicture())
  return makePgTransactionController(controller)
}
