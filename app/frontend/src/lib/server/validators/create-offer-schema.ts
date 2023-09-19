import { offerItemSchema } from '@server/validators/offer-item-schema'
import { z } from 'zod'

export const createOfferSchema = z.object({
  receiverItems: offerItemSchema.array().nonempty(),
  senderItems: offerItemSchema.array().nonempty()
})
