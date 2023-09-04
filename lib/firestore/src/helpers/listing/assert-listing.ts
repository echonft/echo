import { Listing } from '@echo/firestore-types'
import { isNil } from 'ramda'

export function assertListing(listing: Listing | undefined): asserts listing is NonNullable<Listing> {
  if (isNil(listing)) {
    throw Error('invalid listing id')
  }
  if (listing.expired) {
    throw Error('listing is expired')
  }
  if (listing.state === 'CANCELLED') {
    throw Error('listing has already been cancelled')
  }
  if (listing.state === 'FULFILLED') {
    throw Error('listing is fulfilled')
  }
  if (listing.state === 'INVALID') {
    throw Error('listing is not valid')
  }
}
