import { itemSchema } from '@echo/frontend/lib/validators/item-schema'
import { listingTargetSchema } from '@echo/frontend/lib/validators/listing-target-schema'
import { z } from 'zod'

export const createListingSchema = z.object({
  items: itemSchema.array().min(1),
  target: listingTargetSchema
})
