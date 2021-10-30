import { LoadFacebookUserApi } from '@/domain/contracts/apis'
import { TokenGenerator } from '@/domain/contracts/crypto'
import { AuthenticationError } from '@/domain/entities/errors'
import { FacebookAuthentication } from '@/domain/features'
import { LoadUserAccountRepository, SaveFacebookAccountRepository } from '@/domain/contracts/repository'
import { FacebookAccount, AccessToken } from '@/domain/entities'

type Params = FacebookAuthentication.Params
type Result = FacebookAuthentication.Result
export class FacebookAuthenticationUseCase implements FacebookAuthentication {
  constructor (
    private readonly facebookApi: LoadFacebookUserApi,
    private readonly userAccountRepo: LoadUserAccountRepository & SaveFacebookAccountRepository,
    private readonly crypto: TokenGenerator) {}

  async perform (params: Params): Promise<Result> {
    const fbData = await this.facebookApi.loadUser(params)
    if (fbData !== undefined) {
      const accountData = await this.userAccountRepo.load({ email: fbData.email })
      const fbAccount = new FacebookAccount(fbData, accountData)
      const { id } = await this.userAccountRepo.saveWithFacebook(fbAccount)
      const token = await this.crypto.generateToken({ key: id, expirationInMs: AccessToken.expirationInMs })
      return new AccessToken(token)
    }
    return new AuthenticationError()
  }
}
