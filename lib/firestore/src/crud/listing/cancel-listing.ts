import { updateListingState } from '@echo/firestore/crud/listing/update-listing-state'
import { ListingState } from '@echo/model/constants/listing-state'
import type { Listing } from '@echo/model/types/listing/listing'
import type { Slug } from '@echo/model/types/slug'

export function cancelListing(slug: Slug): Promise<Listing> {
  return updateListingState(slug, ListingState.Cancelled)
}
