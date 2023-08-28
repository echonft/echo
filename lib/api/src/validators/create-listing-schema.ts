import { listingItemSchema } from './listing-item-schema'
import { listingTargetSchema } from './listing-target-schema'
import { z } from 'zod'

export const createListingSchema = z.object({
  items: listingItemSchema.array().nonempty(),
  targets: listingTargetSchema.array().nonempty()
})
