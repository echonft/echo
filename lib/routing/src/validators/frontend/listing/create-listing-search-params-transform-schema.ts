import type { NftIndex } from '@echo/model/types/nft'
import { serializedCollectionSchema } from '@echo/model/validators/collection-schema'
import { serializedNftSchema } from '@echo/model/validators/nft-schema'
import { createListingSearchParamsSchema } from '@echo/routing/validators/frontend/listing/create-listing-search-params-schema'
import type { Nullable } from '@echo/utils/types/nullable'
import { assoc, identity, is, juxt, prop, unless } from 'ramda'
import { object } from 'zod'

interface TransformResult {
  items: NftIndex[]
  target: Nullable<Lowercase<string>>
}

export const createListingSearchParamsTransformSchema = createListingSearchParamsSchema.pipe(
  object({
    items: serializedNftSchema
      .array()
      .nonempty()
      .or(serializedNftSchema)
      .transform<NftIndex[]>(unless(is(Array), juxt([identity])))
  })
    .transform<TransformResult>(assoc('target', undefined))
    .or(
      object({
        target: serializedCollectionSchema.transform(prop('slug'))
      }).transform<TransformResult>(assoc('items', []))
    )
)
