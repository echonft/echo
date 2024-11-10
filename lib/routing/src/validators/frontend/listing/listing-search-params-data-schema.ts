import { serializedCollectionSchema } from '@echo/model/validators/collection-schema'
import { serializedNftSchema } from '@echo/model/validators/nft-schema'
import { assoc, prop } from 'ramda'
import { object } from 'zod'

export const listingSearchParamsDataSchema = object({
  items: serializedNftSchema.array().nonempty()
})
  .transform(assoc('target', undefined))
  .or(
    object({
      target: serializedCollectionSchema.transform(prop('slug'))
    }).transform(assoc('items', []))
  )
