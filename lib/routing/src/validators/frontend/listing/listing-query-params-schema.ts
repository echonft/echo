import { nftIndexSchema } from '@echo/model/validators/nft-schema'
import { withSlugSchema } from '@echo/model/validators/slug-schema'
import { object } from 'zod'

export const listingQueryParamsSchema = object({
  items: nftIndexSchema.array().nonempty()
})
  .strict()
  .or(
    object({
      target: withSlugSchema
    }).strict()
  )
