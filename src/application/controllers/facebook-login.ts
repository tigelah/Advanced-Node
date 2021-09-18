import { AccessToken } from '@/domain/models'
import { FacebookAuthentication } from '@/domain/features/facebook-authentication'
import { HttpResponse, badRequest, unauthorized, serverError, ok } from '@/application/helpers'
import { ValidationComposite } from '@/application/validation'
import { ValidationBuilder } from '../validation/builder'

type HttpRequest = {
  token: string
}

type Model = Error | {
  accessToken: string
}
export class FacebookLoginController {
  constructor (private readonly facebookAuthentication: FacebookAuthentication) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const error = this.validate(httpRequest)
      if (error !== undefined) {
        return badRequest(error)
      }
      const accessToken = await this.facebookAuthentication.perform({ token: httpRequest.token })
      if (accessToken instanceof AccessToken) {
        return ok({
          accessToken: accessToken.value
        })
      } else {
        return unauthorized()
      }
    } catch (error: any) {
      return serverError(error)
    }
  }

  private validate (httpRequest: HttpRequest): Error | undefined {
    return new ValidationComposite([
      ...ValidationBuilder
        .of({ value: httpRequest.token, fieldName: 'token' })
        .required()
        .build()
    ]).validate()
  }
}
