import { AuthenticationError } from '@/domain/errors/'
import { FacebookAuthenticationUseCase } from '@/data/usecases'

import { mock, MockProxy } from 'jest-mock-extended'
import { LoadFacebookUserApi } from '../../../src/data/contracts/apis/facebook'

describe('FacebookAuthenticationUseCase', () => {
  let loadFacebookUserApi: MockProxy<LoadFacebookUserApi>
  let sut: FacebookAuthenticationUseCase

  beforeEach(() => {
    loadFacebookUserApi = mock()
    sut = new FacebookAuthenticationUseCase(loadFacebookUserApi)
  })

  it('should call LoadFacebookUserApi with correct params', async () => {
    await sut.perform({ token: 'any_token' })

    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({ token: 'any_token' })
    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return AutheticationError when LoadFacebookUserApi returns undefined', async () => {
    loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined)

    const authResult = await sut.perform({ token: 'any_token' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
