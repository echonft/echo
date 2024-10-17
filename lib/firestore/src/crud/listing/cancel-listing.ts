import { updateListingState } from '@echo/firestore/crud/listing/update-listing-state'
import { ListingState } from '@echo/model/constants/listing-state'
import type { Listing } from '@echo/model/types/listing/listing'

export function cancelListing(slug: string): Promise<Listing> {
  return updateListingState(slug, ListingState.Cancelled)
}
