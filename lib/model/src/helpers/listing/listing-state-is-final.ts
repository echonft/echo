import { LISTING_STATE_CANCELLED, LISTING_STATE_FULFILLED } from '@echo/model/constants/listing-states'
import type { ListingState } from '@echo/model/types/listing-state'

export function listingStateIsFinal(state: ListingState) {
  return state === LISTING_STATE_FULFILLED || state === LISTING_STATE_CANCELLED
}
