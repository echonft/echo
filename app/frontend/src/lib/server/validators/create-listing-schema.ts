import { listingItemSchema } from '@echo/frontend/lib/server/validators/listing-item-schema'
import { listingTargetSchema } from '@echo/frontend/lib/server/validators/listing-target-schema'
import { z } from 'zod'

export const createListingSchema = z.object({
  items: listingItemSchema.array().min(1),
  target: listingTargetSchema
})
