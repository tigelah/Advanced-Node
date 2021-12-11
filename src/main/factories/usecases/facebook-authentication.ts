import { makeFacebookApi } from '@/main/factories/gateways/facebook'
import { makePgUserAccountRepo } from '@/main/factories/repo'
import { makeJwtTokenHandler } from '@/main/factories/gateways'
import { setupFacebookAuthentication, FacebookAuthentication } from '@/domain/usecases/facebook-authentication'

export const makeFacebookAuthentication = (): FacebookAuthentication => {
  return setupFacebookAuthentication(makeFacebookApi(), makePgUserAccountRepo(), makeJwtTokenHandler())
}
