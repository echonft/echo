import { idRequestSchema } from './id-request-schema'
import { z } from 'zod'

export const offerItemSchema = z.object({
  amount: z.number().gte(0),
  nft: idRequestSchema.required()
})
