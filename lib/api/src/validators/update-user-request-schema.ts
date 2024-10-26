import { number, object, string } from 'zod'

export const updateUserRequestSchema = object({
  access_token: string().min(1),
  refresh_token: string().min(1),
  expires_in: number(),
  expires_at: number(),
  scope: string().min(1),
  token_type: string().min(1)
})
