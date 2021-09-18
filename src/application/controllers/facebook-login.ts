import { AccessToken } from '@/domain/models'
import { FacebookAuthentication } from '@/domain/features/facebook-authentication'
import { Controller } from '@/application/controllers'
import { HttpResponse, unauthorized, ok } from '@/application/helpers'
import { Validator } from '@/application/validation'
import { ValidationBuilder as Builder } from '../validation/builder'

type HttpRequest = {
  token: string
}

type Model = Error | {
  accessToken: string
}
export class FacebookLoginController extends Controller {
  constructor (private readonly facebookAuthentication: FacebookAuthentication) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    const accessToken = await this.facebookAuthentication.perform({ token: httpRequest.token })
    return accessToken instanceof AccessToken
      ? ok({ accessToken: accessToken.value })
      : unauthorized()
  }

  override buildValidators (httpRequest: HttpRequest): Validator[] {
    return [
      ...Builder
        .of({ value: httpRequest.token, fieldName: 'token' })
        .required()
        .build()
    ]
  }
}
