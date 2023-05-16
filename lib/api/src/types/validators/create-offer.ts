import { offerItem } from './offer-item'
import { z } from 'zod'

export const createOfferSchema = z.object({
  receiverItems: offerItem.array().nonempty(),
  senderItems: offerItem.array().nonempty(),
  requestForOfferId: z.string().nonempty().optional()
})
