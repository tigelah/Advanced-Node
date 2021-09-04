import { AuthenticationError } from '@/domain/errors/'
import { FacebookAuthenticationUseCase } from '@/data/usecases'

import { mock, MockProxy } from 'jest-mock-extended'
import { LoadFacebookUserApi } from '../../../src/data/contracts/apis/facebook'

type SutTypes = {
  sut: FacebookAuthenticationUseCase
  loadFacebookUserApi: MockProxy<LoadFacebookUserApi>
}

const makeSut = (): SutTypes => {
  const loadFacebookUserApi = mock<LoadFacebookUserApi>()
  const sut = new FacebookAuthenticationUseCase(loadFacebookUserApi)

  return {
    sut,
    loadFacebookUserApi
  }
}

describe('FacebookAuthenticationUseCase', () => {
  it('should call LoadFacebookUserApi with correct params', async () => {
    const { sut, loadFacebookUserApi } = makeSut()

    await sut.perform({ token: 'any_token' })

    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({ token: 'any_token' })
    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return AutheticationError when LoadFacebookUserApi returns undefined', async () => {
    const { sut, loadFacebookUserApi } = makeSut()
    loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined)

    const authResult = await sut.perform({ token: 'any_token' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
