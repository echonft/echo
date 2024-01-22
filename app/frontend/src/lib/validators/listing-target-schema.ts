import { idRequestSchema } from '@echo/frontend/lib/validators/id-request-schema'
import { z } from 'zod'

export const listingTargetSchema = z.object({
  amount: z.number().gt(0),
  collection: idRequestSchema.required()
})
