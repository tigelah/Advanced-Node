import { JwtTokenGenerator } from '@/infra/crypto/jwt-token-generator'

import { env } from '@/main/config/env'

export const makeJwtTokenGenerator = (): JwtTokenGenerator => {
  return new JwtTokenGenerator(env.jwtSecret)
}
