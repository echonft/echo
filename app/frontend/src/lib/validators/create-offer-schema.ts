import { offerItemSchema } from '@echo/frontend/lib/validators/offer-item-schema'
import { z } from 'zod'

export const createOfferSchema = z.object({
  receiverItems: offerItemSchema.array().min(1),
  senderItems: offerItemSchema.array().min(1)
})
