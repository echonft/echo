import { offerItem } from './offer-item'
import { z } from 'zod'

export const createOfferSchema = z.object({
  receiverDiscordId: z.string().nonempty(),
  receiverItems: offerItem.array().nonempty(),
  senderItems: offerItem.array().nonempty()
})
