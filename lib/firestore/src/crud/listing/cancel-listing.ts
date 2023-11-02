import { updateListingState } from '@echo/firestore/crud/listing/update-listing-state'

export async function cancelListing(listingId: string) {
  return await updateListingState(listingId, 'CANCELLED')
}
