import { updateListingState } from '@echo/firestore/crud/listing/update-listing-state'
import type { ListingDocument } from '@echo/firestore/types/model/listing-document'
import { ListingState } from '@echo/model/constants/listing-state'
import type { Slug } from '@echo/model/types/slug'

export function expireListing(slug: Slug): Promise<ListingDocument> {
  return updateListingState(slug, ListingState.Expired)
}
