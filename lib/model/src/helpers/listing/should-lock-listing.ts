import { ListingState } from '@echo/model/constants/listing-state'

/**
 * Returns `true` if a listing should be locked following a state transition.
 * Listings never transition to ListingState.Open, but we can in Storybook, so we add it here.
 * @param toState
 */
export function shouldLockListing(toState: ListingState): boolean {
  return toState !== ListingState.OffersPending && toState !== ListingState.Open
}
