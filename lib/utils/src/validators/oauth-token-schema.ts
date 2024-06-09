import type { OAuthToken } from '@echo/utils/types/oauth-token'
import dayjs from 'dayjs'
import { applySpec, pipe, prop } from 'ramda'
import { number, object, string } from 'zod'

export const OAuthTokenSchema = object({
  access_token: string(),
  expires_in: number(),
  token_type: string()
}).transform<OAuthToken>(
  applySpec<OAuthToken>({
    accessToken: prop('access_token'),
    expiresAt: pipe(prop('expires_in'), (expiresIn: number) => dayjs().add(expiresIn, 'seconds').unix()),
    tokenType: prop('token_type')
  })
)
