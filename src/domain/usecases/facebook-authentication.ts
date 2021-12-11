import { LoadFacebookUser, TokenGenerator } from '@/domain/contracts/gateways'

import { AuthenticationError } from '@/domain/entities/errors'
import { LoadUserAccount, SaveFacebookAccount } from '@/domain/contracts/repository'
import { FacebookAccount, AccessToken } from '@/domain/entities'

type Setup = (facebook: LoadFacebookUser, userAccountRepo: LoadUserAccount & SaveFacebookAccount, token: TokenGenerator) => FacebookAuthentication
type Input = { token: string }
type Output = { accessToken: string }
export type FacebookAuthentication = (input: Input) => Promise<Output>

export const setupFacebookAuthentication: Setup = (facebook, userAccountRepo, token) => async input => {
  const fbData = await facebook.loadUser(input)
  if (fbData !== undefined) {
    const accountData = await userAccountRepo.load({ email: fbData.email })
    const fbAccount = new FacebookAccount(fbData, accountData)
    const { id } = await userAccountRepo.saveWithFacebook(fbAccount)
    const accessToken = await token.generate({ key: id, expirationInMs: AccessToken.expirationInMs })
    return { accessToken }
  }
  throw new AuthenticationError()
}
