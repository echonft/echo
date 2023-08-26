import { Listing } from '../../types/model/listing'
import { isNil } from 'ramda'

export function assertListing(listing: Listing | undefined) {
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
