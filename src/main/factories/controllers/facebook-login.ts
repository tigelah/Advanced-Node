import { FacebookLoginController } from '@/application/controllers/facebook-login'
import { makeFacebookAuthenticationService } from '@/main/factories/usecases'

export const makeFacebookLoginController = (): FacebookLoginController => {
  return new FacebookLoginController(makeFacebookAuthenticationService())
}
