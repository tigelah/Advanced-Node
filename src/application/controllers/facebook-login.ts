import { Controller } from '@/application/controllers'
import { HttpResponse, unauthorized, ok } from '@/application/helpers'
import { Validator } from '@/application/validation'
import { ValidationBuilder as Builder } from '../validation/builder'
import { FacebookAuthentication } from '@/domain/usecases'

type HttpRequest = { token: string }
type Model = Error | { accessToken: string }
export class FacebookLoginController extends Controller {
  constructor (private readonly facebookAuthentication: FacebookAuthentication) {
    super()
  }

  async perform ({ token }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const accessToken = await this.facebookAuthentication({ token })
      return ok(accessToken)
    } catch {
      return unauthorized()
    }
  }

  override buildValidators ({ token }: HttpRequest): Validator[] {
    return [
      ...Builder
        .of({ value: token, fieldName: 'token' })
        .required()
        .build()
    ]
  }
}
