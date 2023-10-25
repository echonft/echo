import { idRequestSchema } from '@echo/frontend/lib/server/validators/id-request-schema'
import { z } from 'zod'

export const offerItemSchema = z.object({
  amount: z.number().gt(0),
  nft: idRequestSchema.required()
})
