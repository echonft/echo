import { serializeListingSchema } from '@echo/model/validators/listing-schema'
import { serializeOfferSchema } from '@echo/model/validators/offer-schema'
import { serializeSwapSchema } from '@echo/model/validators/swap-schema'
import { object } from 'zod'

export const selectionQueryParamsTransformSchema = object({
  offer: serializeOfferSchema
})
  .strict()
  .or(
    object({
      listing: serializeListingSchema
    }).strict()
  )
  .or(object({ swap: serializeSwapSchema }).strict())
