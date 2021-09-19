import { FacebookApi } from '@/infra/apis'
import { AxiosHttpClient } from '@/infra/http'
import { env } from '@/main/config/env'

describe('Facebook API Integration Tests', () => {
  it('should return a Facebook User if token is valid', async () => {
    const axiosClient = new AxiosHttpClient()
    const sut = new FacebookApi(
      axiosClient,
      env.facebookApi.clientId,
      env.facebookApi.clientSecret
    )

    const fbUser = await sut.loadUser({ token: 'EAAOaCeZCX3KUBAKzW2Wwbj57vmXhrFeBoahXBZBf8dU3M05ZC1TvXIvBevZCVl77AUZAtgbZAWCAUTkQ3vZCZBAvhVlUqqtlJ8LPSAnVsFkEYLvEWo442o1O2LydJShDZCRioZBspvBugt5EIuvAYSLxZCy9GEibT41XuGRtFlBN1woJ6rqUkWaYPPe1fllaJPcMC2GxaiGgMEX5JehKWSrB9KZC' })

    expect(fbUser).toEqual({
      facebookId: '109572154806374',
      email: 'rodrigo_ybdorzw_test@tfbnw.net',
      name: 'Rodrigo Test'

    })
  })

  it('should return undefined if token is invalid', async () => {
    const axiosClient = new AxiosHttpClient()
    const sut = new FacebookApi(
      axiosClient,
      env.facebookApi.clientId,
      env.facebookApi.clientSecret
    )

    const fbUser = await sut.loadUser({ token: 'invalid' })

    expect(fbUser).toBeUndefined()
  })
})
