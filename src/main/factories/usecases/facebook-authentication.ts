import { makeFacebookApi } from '@/main/factories/apis/facebook'
import { makePgUserAccountRepo } from '@/main/factories/repo'
import { makeJwtTokenGenerator } from '@/main/factories/crypto'
import { setupFacebookAuthentication, FacebookAuthentication } from '@/domain/usecases/facebook-authentication'

export const makeFacebookAuthentication = (): FacebookAuthentication => {
  return setupFacebookAuthentication(makeFacebookApi(), makePgUserAccountRepo(), makeJwtTokenGenerator())
}
