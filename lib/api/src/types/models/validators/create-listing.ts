import { offerItem } from './offer-item'
import { target } from './target'
import { z } from 'zod'

export const createListingSchema = z.object({
  discordGuild: z.string().nonempty(),
  target: target.array().nonempty(),
  // TODO Maybe add a validation so they are all from the same contract?
  // Or maybe we change the structure to be a contract and a list of ids?
  items: offerItem.array().nonempty()
})
