import { type Listing } from '@echo/model/types/listing'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'

export function assertListing(listing: Nullable<Listing>): asserts listing is NonNullable<Listing> {
  if (isNil(listing)) {
    throw Error('listing is not defined')
  }
  if (propIsNil('id', listing)) {
    throw Error('listing does not have an id')
  }
}
