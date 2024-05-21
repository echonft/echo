import { itemSchema } from '@echo/frontend/lib/validators/item-schema'
import { z } from 'zod'

export const createOfferSchema = z.object({
  receiverItems: itemSchema.array().min(1),
  senderItems: itemSchema.array().min(1),
  expiresAt: z.number().gt(0)
})
