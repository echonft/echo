import { target } from './target'
import { z } from 'zod'

export const createRequestForOfferSchema = z.object({
  discordGuildId: z.string().nonempty(),
  target: target.array().nonempty(),
  // TODO Maybe add a validation so they are all from the same contract?
  // Or maybe we change the structure to be a contract and a list of ids?
  items: z.string().nonempty().array().nonempty()
})
