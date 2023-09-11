import { listingItemSchema } from '@server/validators/listing-item-schema'
import { listingTargetSchema } from '@server/validators/listing-target-schema'
import { z } from 'zod'

export const createListingSchema = z.object({
  items: listingItemSchema.array().nonempty(),
  targets: listingTargetSchema.array().nonempty()
})
