import { expirationSchema } from '@echo/frontend/lib/validators/expiration-schema'
import { listingTargetSchema } from '@echo/frontend/lib/validators/listing-target-schema'
import { nftIndexSchema } from '@echo/frontend/lib/validators/nft-index-schema'
import { object } from 'zod'

export const createListingSchema = object({
  items: nftIndexSchema.array().min(1),
  target: listingTargetSchema,
  expiration: expirationSchema
})
