import { updateListingState } from '@echo/firestore/crud/listing/update-listing-state'
import { LISTING_STATE_CANCELLED } from '@echo/model/constants/listing-states'
import type { Listing } from '@echo/model/types/listing/listing'

export function cancelListing(slug: string): Promise<Listing> {
  return updateListingState(slug, LISTING_STATE_CANCELLED)
}
