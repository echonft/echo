import { listingSchema } from '@echo/model/validators/listing-schema'
import { slugSchema } from '@echo/model/validators/slug-schema'
import { findIndex, isEmpty, isNil, propEq } from 'ramda'
import { object } from 'zod'

export const listingDetailsSearchParamsTransformSchema = object({
  listings: listingSchema.array(),
  searchParams: object({
    listing: slugSchema.optional()
  })
}).transform(({ listings, searchParams }) => {
  if (isEmpty(searchParams) || isNil(searchParams.listing)) {
    return undefined
  }
  const index = findIndex(propEq(searchParams.listing, 'slug'), listings)
  if (index === -1) {
    return undefined
  }
  return index
})
