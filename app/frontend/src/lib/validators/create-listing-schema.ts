import { listingTargetSchema } from '@echo/frontend/lib/validators/listing-target-schema'
import { nftIndexSchema } from '@echo/frontend/lib/validators/nft-index-schema'
import { z } from 'zod'

export const createListingSchema = z.object({
  items: nftIndexSchema.array().min(1),
  target: listingTargetSchema
})
