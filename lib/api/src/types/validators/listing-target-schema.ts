import { idRequestSchema } from './id-request-schema'
import { z } from 'zod'

export const listingTargetSchema = z.object({
  amount: z.number().gte(0),
  collection: idRequestSchema.required()
})
