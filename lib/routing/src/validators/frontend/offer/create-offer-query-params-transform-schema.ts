import { serializeCollectionSchema } from '@echo/model/validators/collection-schema'
import { serializeNftSchema } from '@echo/model/validators/nft-schema'
import { object } from 'zod'

export const createOfferQueryParamsTransformSchema = object({
  items: serializeNftSchema.array().nonempty(),
  target: serializeCollectionSchema.optional()
}).strict()
