import { Id, Listing } from '@echo/firestore-types'
import { propIsNil } from '@echo/utils'
import { isNil } from 'ramda'

export function assertListing(
  listing: Partial<Listing> | undefined
): asserts listing is NonNullable<Partial<Listing>> & Id {
  if (isNil(listing)) {
    throw Error('listing is not defined')
  }
  if (propIsNil('id', listing)) {
    throw Error('listing does not have an id')
  }
}
