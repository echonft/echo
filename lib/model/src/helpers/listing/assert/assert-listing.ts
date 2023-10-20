import { type Listing } from '@echo/model/types/listing'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { isNil } from 'ramda'

export function assertListing(listing: Listing | undefined): asserts listing is NonNullable<Listing> {
  if (isNil(listing)) {
    throw Error('listing is not defined')
  }
  if (propIsNil('id', listing)) {
    throw Error('listing does not have an id')
  }
}
