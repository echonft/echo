import { type Listing } from '@echo/model/types/listing'
import { type ListingState } from '@echo/model/types/listing-state'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'

function assertListingIsNotOpen(listing: Listing) {
  if (listing.state === 'OPEN') {
    throw Error('listing state cannot be OPEN')
  }
}

function assertListingIsNotPendingOffers(listing: Listing) {
  if (listing.state === 'OFFERS_PENDING') {
    throw Error('listing state cannot be OFFERS_PENDING')
  }
}

function assertListingIsNotPartiallyFulfilled(listing: Listing) {
  if (listing.state === 'PARTIALLY_FULFILLED') {
    throw Error('listing state cannot be PARTIALLY_FULFILLED')
  }
}

function assertListingIsNotFulfilled(listing: Listing) {
  if (listing.state === 'FULFILLED') {
    throw Error('listing state cannot be FULFILLED')
  }
}

function assertListingIsNotCancelled(listing: Listing) {
  if (listing.state === 'CANCELLED') {
    throw Error('listing has already been cancelled')
  }
}

export function assertListingState(
  listing: Listing,
  toState: ListingState
): asserts listing is Listing & Record<'state', ListingState> {
  if (propIsNil('state', listing)) {
    throw Error('listing does not have a state')
  }

  switch (toState) {
    case 'OPEN':
      throw Error('listing cannot go back to OPEN state')
    case 'OFFERS_PENDING':
      assertListingIsNotPendingOffers(listing)
      assertListingIsNotPartiallyFulfilled(listing)
      assertListingIsNotFulfilled(listing)
      assertListingIsNotCancelled(listing)
      break
    case 'PARTIALLY_FULFILLED':
      assertListingIsNotOpen(listing)
      assertListingIsNotPartiallyFulfilled(listing)
      assertListingIsNotFulfilled(listing)
      assertListingIsNotCancelled(listing)
      break
    case 'FULFILLED':
      assertListingIsNotOpen(listing)
      assertListingIsNotFulfilled(listing)
      assertListingIsNotCancelled(listing)
      break
    case 'CANCELLED':
      assertListingIsNotFulfilled(listing)
      assertListingIsNotCancelled(listing)
      break
  }
}
