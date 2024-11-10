import { serializeCollectionSchema } from '@echo/model/validators/collection-schema'
import { serializeNftSchema } from '@echo/model/validators/nft-schema'
import { object } from 'zod'

export const listingQueryParamsTransformSchema = object({
  items: serializeNftSchema.array().nonempty()
})
  .strict()
  .or(
    object({
      target: serializeCollectionSchema
    }).strict()
  )
