import { listingStateIsFinal } from '@echo/model/helpers/listing/listing-state-is-final'
import type { Listing } from '@echo/model/types/listing'

export function listingIsFinalOrExpired(listing: Listing) {
  if (listing.expired) {
    return true
  }
  return listingStateIsFinal(listing.state)
}
