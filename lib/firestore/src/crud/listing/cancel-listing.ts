import { updateListingState } from '@echo/firestore/crud/listing/update-listing-state'
import type { ListingDocument } from '@echo/firestore/types/model/listing-document'
import { ListingState } from '@echo/model/constants/listing-state'

export function cancelListing(slug: Lowercase<string>): Promise<ListingDocument> {
  return updateListingState(slug, ListingState.Cancelled)
}
