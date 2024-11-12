import { object, string } from 'zod'

export const verifyRequestSchema = object({
  discordId: string().min(1)
})
