import { intStringSchema } from '@echo/model/validators/int-string-schema'
import { number, object, string } from 'zod'

export const discordProfileResponseSchema = object({
  avatar: string().optional().nullable(),
  discriminator: intStringSchema.or(number()),
  global_name: string().optional().nullable(),
  id: string().min(1),
  username: string().min(1)
})
