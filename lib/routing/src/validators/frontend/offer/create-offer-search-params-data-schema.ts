import { serializedCollectionSchema } from '@echo/model/validators/collection-schema'
import { serializedNftSchema } from '@echo/model/validators/nft-schema'
import { prop } from 'ramda'
import { object } from 'zod'

export const createOfferSearchParamsDataSchema = object({
  items: serializedNftSchema.array().nonempty(),
  target: serializedCollectionSchema.transform(prop('slug')).optional()
})
