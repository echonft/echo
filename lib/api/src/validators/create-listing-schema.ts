import { listingTargetSchema } from './listing-target-schema'
import { offerItemSchema } from './offer-item-schema'
import { z } from 'zod'

export const createListingSchema = z.object({
  items: offerItemSchema.array().nonempty(),
  targets: listingTargetSchema.array().nonempty()
})
