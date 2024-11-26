import type { NftIndex } from '@echo/model/types/nft'
import { serializedCollectionSchema } from '@echo/model/validators/collection-schema'
import { serializedNftSchema } from '@echo/model/validators/nft-schema'
import { createOfferSearchParamsSchema } from '@echo/routing/validators/frontend/offer/create-offer-search-params-schema'
import { identity, is, juxt, prop, unless } from 'ramda'
import { object } from 'zod'

export const createOfferSearchParamsTransformSchema = createOfferSearchParamsSchema.pipe(
  object({
    items: serializedNftSchema
      .array()
      .nonempty()
      .or(serializedNftSchema)
      .transform<NftIndex[]>(unless(is(Array), juxt([identity]))),
    target: serializedCollectionSchema.transform(prop('slug')).optional()
  })
)
