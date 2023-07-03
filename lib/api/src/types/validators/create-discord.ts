import { target } from './target'
import { z } from 'zod'

export const createDiscordSchema = z.object({
  contracts: target.required().array().nonempty(),
  channelId: z
    .number()
    .gt(0)
    .transform((value) => value.toString()),
  discordId: z
    .number()
    .gt(0)
    .transform((value) => value.toString()),
  name: z.string().nonempty()
})
