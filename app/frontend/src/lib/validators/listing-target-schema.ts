import { slugSchema } from '@echo/utils/validators/slug-schema'
import { z } from 'zod'

export const listingTargetSchema = z.object({
  amount: z.number().gt(0),
  collection: slugSchema
})
