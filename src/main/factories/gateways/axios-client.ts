import { AxiosHttpClient } from '@/infra/gateways/axios-client'

export const makeAxiosHttpClient = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}
