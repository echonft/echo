import { listingTargetSchema } from '@echo/frontend/lib/validators/listing-target-schema'
import { nftIndexSchema } from '@echo/frontend/lib/validators/nft-index-schema'
import { now } from '@echo/utils/helpers/now'
import { number, object } from 'zod'

export const createListingSchema = object({
  items: nftIndexSchema.array().min(1),
  target: listingTargetSchema,
  expiresAt: number().gt(now())
})
