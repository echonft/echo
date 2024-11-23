import { offerSchema } from '@echo/model/validators/offer-schema'
import { slugSchema } from '@echo/model/validators/slug-schema'
import { findIndex, isEmpty, isNil, propEq } from 'ramda'
import { object } from 'zod'

export const offerDetailsSearchParamsTransformSchema = object({
  offers: offerSchema.array(),
  searchParams: object({
    offer: slugSchema.optional()
  })
}).transform(({ offers, searchParams }) => {
  if (isEmpty(searchParams) || isNil(searchParams.offer)) {
    return undefined
  }
  const index = findIndex(propEq(searchParams.offer, 'slug'), offers)
  if (index === -1) {
    return undefined
  }
  return index
})
