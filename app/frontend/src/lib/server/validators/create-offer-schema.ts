import { offerItemSchema } from '@server/validators/offer-item-schema'
import { z } from 'zod'

export const createOfferSchema = z.object({
  receiverId: z.string().nonempty(),
  receiverItems: offerItemSchema.array().nonempty(),
  senderItems: offerItemSchema.array().nonempty()
})
