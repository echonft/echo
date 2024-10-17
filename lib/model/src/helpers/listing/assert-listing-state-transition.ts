import { ListingState } from '@echo/model/constants/listing-state'
import { type Listing } from '@echo/model/types/listing/listing'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'

function assertListingIsNotOpen(listing: Listing) {
  if (listing.state === ListingState.Open) {
    throw Error('listing state cannot be OPEN')
  }
}

function assertListingIsNotPendingOffers(listing: Listing) {
  if (listing.state === ListingState.OffersPending) {
    throw Error('listing state cannot be OFFERS_PENDING')
  }
}

function assertListingIsNotPartiallyFulfilled(listing: Listing) {
  if (listing.state === ListingState.PartiallyFulfilled) {
    throw Error('listing state cannot be PARTIALLY_FULFILLED')
  }
}

export function assertListingStateTransition(
  listing: Nullable<Listing>,
  toState: ListingState
): asserts listing is Omit<Listing, 'state'> & Record<'state', ListingState> {
  if (isNil(listing)) {
    throw Error('listing is not defined')
  }
  if (listing.readOnly) {
    throw Error('listing is read only')
  }
  switch (toState) {
    case ListingState.Open:
      throw Error('listing cannot go back to OPEN state')
    case ListingState.OffersPending:
      assertListingIsNotPendingOffers(listing)
      assertListingIsNotPartiallyFulfilled(listing)
      break
    case ListingState.PartiallyFulfilled:
      assertListingIsNotOpen(listing)
      assertListingIsNotPartiallyFulfilled(listing)
      break
    case ListingState.Fulfilled:
      assertListingIsNotOpen(listing)
      break
  }
}
