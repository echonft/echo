import { idRequestSchema } from '@server/validators/id-request-schema'
import { z } from 'zod'

export const listingItemSchema = z.object({
  amount: z.number().gt(0),
  nft: idRequestSchema.required()
})
