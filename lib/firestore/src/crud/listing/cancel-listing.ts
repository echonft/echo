import { updateListingState } from '@echo/firestore/crud/listing/update-listing-state'
import { LISTING_STATE_CANCELLED } from '@echo/model/constants/listing-states'
import type { Listing } from '@echo/model/types/listing'

export function cancelListing(listingId: string): Promise<Listing> {
  return updateListingState(listingId, LISTING_STATE_CANCELLED)
}
