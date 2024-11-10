import { nftIndexSchema } from '@echo/model/validators/nft-schema'
import { withSlugSchema } from '@echo/model/validators/slug-schema'
import { object } from 'zod'

export const offerQueryParamsSchema = object({
  items: nftIndexSchema.array().nonempty(),
  target: withSlugSchema.optional()
}).strict()
