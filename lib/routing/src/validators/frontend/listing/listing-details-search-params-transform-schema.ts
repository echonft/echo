import { listingSchema } from '@echo/model/validators/listing-schema'
import { slugSchema } from '@echo/model/validators/slug-schema'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import { findIndex, propEq } from 'ramda'
import { object } from 'zod'

export const listingDetailsSearchParamsTransformSchema = object({
  listings: listingSchema.array(),
  searchParams: object({
    listing: slugSchema
  }).optional()
}).transform(({ listings, searchParams }) => {
  if (isNilOrEmpty(searchParams)) {
    return undefined
  }
  const index = findIndex(propEq(searchParams.listing, 'slug'), listings)
  if (index === -1) {
    return undefined
  }
  return index
})
