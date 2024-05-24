import { collectionSchema } from '@echo/frontend/lib/validators/collection-schema'
import { z } from 'zod'

export const listingTargetSchema = z.object({
  amount: z.number().gt(0),
  collection: collectionSchema
})
