import { number, object, string } from 'zod'

export const discordAuthTokenResponseSchema = object({
  token_type: string(),
  access_token: string(),
  expires_in: number().int().positive(),
  refresh_token: string(),
  scope: string()
})
