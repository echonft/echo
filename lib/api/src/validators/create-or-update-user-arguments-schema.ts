import { z } from 'zod'

export const createOrUpdateUserArgumentsSchema = z.object({
  accessToken: z.string().nonempty(),
  tokenType: z.string().nonempty(),
  discordId: z.string().nonempty()
})
