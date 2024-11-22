import { nftIndexSchema } from '@echo/model/validators/nft-schema'
import { withSlugSchema } from '@echo/model/validators/slug-schema'
import { object } from 'zod'

export const createOfferQueryParamsSchema = object({
  items: nftIndexSchema.array().nonempty(),
  target: withSlugSchema.optional()
}).strict()
