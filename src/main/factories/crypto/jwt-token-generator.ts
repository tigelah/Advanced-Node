import { JwtTokenHandler } from '@/infra/crypto/jwt-token-generator'

import { env } from '@/main/config/env'

export const makeJwtTokenHandler = (): JwtTokenHandler => {
  return new JwtTokenHandler(env.jwtSecret)
}
