import { updateListingState } from '@echo/firestore/crud/listing/update-listing-state'
import { LISTING_STATE_CANCELLED } from '@echo/model/constants/listing-states'

export async function cancelListing(listingId: string) {
  return await updateListingState(listingId, LISTING_STATE_CANCELLED)
}
