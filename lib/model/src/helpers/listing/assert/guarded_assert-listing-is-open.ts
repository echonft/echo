import {
  LISTING_STATE_OFFERS_PENDING,
  LISTING_STATE_OPEN,
  LISTING_STATE_PARTIALLY_FULFILLED
} from '@echo/model/constants/listing-states'
import { assertListingIsNotExpired } from '@echo/model/helpers/listing/assert/assert-listing-is-not-expired'
import type { Listing } from '@echo/model/types/listing'

export function guarded_assertListingIsOpen(listing: Listing) {
  try {
    assertListingIsNotExpired(listing)
  } catch {
    return false
  }
  return (
    listing.state === LISTING_STATE_OPEN ||
    listing.state === LISTING_STATE_PARTIALLY_FULFILLED ||
    listing.state === LISTING_STATE_OFFERS_PENDING
  )
}
