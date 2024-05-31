import { z } from 'zod'

export const discordAuthTokenSchema = z.object({
  access_token: z.string().min(1),
  refresh_token: z.string().min(1),
  expires_in: z.number(),
  expires_at: z.number(),
  scope: z.string().min(1),
  token_type: z.string().min(1)
})
