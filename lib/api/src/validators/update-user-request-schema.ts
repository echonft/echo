import { number, object, string } from 'zod'

export const updateUserRequestSchema = object({
  access_token: string().min(1).readonly(),
  refresh_token: string().min(1).readonly(),
  expires_in: number().readonly(),
  expires_at: number().readonly(),
  scope: string().min(1).readonly(),
  token_type: string().min(1).readonly()
}).readonly()
