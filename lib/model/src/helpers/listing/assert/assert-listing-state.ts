import {
  LISTING_STATE_CANCELLED,
  LISTING_STATE_FULFILLED,
  LISTING_STATE_OFFERS_PENDING,
  LISTING_STATE_OPEN,
  LISTING_STATE_PARTIALLY_FULFILLED
} from '@echo/model/constants/listing-states'
import { type Listing } from '@echo/model/types/listing'
import { type ListingState } from '@echo/model/types/listing-state'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'

function assertListingIsNotOpen(listing: Listing) {
  if (listing.state === LISTING_STATE_OPEN) {
    throw Error('listing state cannot be OPEN')
  }
}

function assertListingIsNotPendingOffers(listing: Listing) {
  if (listing.state === LISTING_STATE_OFFERS_PENDING) {
    throw Error('listing state cannot be OFFERS_PENDING')
  }
}

function assertListingIsNotPartiallyFulfilled(listing: Listing) {
  if (listing.state === LISTING_STATE_PARTIALLY_FULFILLED) {
    throw Error('listing state cannot be PARTIALLY_FULFILLED')
  }
}

export function assertListingState(
  listing: Listing,
  toState: ListingState
): asserts listing is Omit<Listing, 'state'> & Record<'state', ListingState> {
  if (propIsNil('state', listing)) {
    throw Error('listing does not have a state')
  }
  if (listing.readOnly) {
    throw Error('listing is read only')
  }
  switch (toState) {
    case LISTING_STATE_OPEN:
      throw Error('listing cannot go back to OPEN state')
    case LISTING_STATE_OFFERS_PENDING:
      assertListingIsNotPendingOffers(listing)
      assertListingIsNotPartiallyFulfilled(listing)
      break
    case LISTING_STATE_PARTIALLY_FULFILLED:
      assertListingIsNotOpen(listing)
      assertListingIsNotPartiallyFulfilled(listing)
      break
    case LISTING_STATE_FULFILLED:
      assertListingIsNotOpen(listing)
      break
    case LISTING_STATE_CANCELLED:
      break
  }
}
