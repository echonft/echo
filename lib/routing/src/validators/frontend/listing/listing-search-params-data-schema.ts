import type { NftIndex } from '@echo/model/types/nft'
import type { Slug } from '@echo/model/types/slug'
import { serializedCollectionSchema } from '@echo/model/validators/collection-schema'
import { serializedNftSchema } from '@echo/model/validators/nft-schema'
import type { Nullable } from '@echo/utils/types/nullable'
import { assoc, prop } from 'ramda'
import { object } from 'zod'

interface TransformResult {
  items: NftIndex[]
  target: Nullable<Slug>
}

export const listingSearchParamsDataSchema = object({
  items: serializedNftSchema.array().nonempty()
})
  .transform<TransformResult>(assoc('target', undefined))
  .or(
    object({
      target: serializedCollectionSchema.transform(prop('slug'))
    }).transform<TransformResult>(assoc('items', []))
  )
