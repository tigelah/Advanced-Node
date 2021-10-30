import { FacebookLoginController } from '@/application/controllers/facebook-login'
import { makeFacebookAuthentication } from '@/main/factories/usecases'

export const makeFacebookLoginController = (): FacebookLoginController => {
  return new FacebookLoginController(makeFacebookAuthentication())
}
