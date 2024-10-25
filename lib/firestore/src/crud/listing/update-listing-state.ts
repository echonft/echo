import { getListingSnapshot } from '@echo/firestore/crud/listing/get-listing'
import { listingsCollection } from '@echo/firestore/helpers/collection/collections'
import { updateReference } from '@echo/firestore/helpers/reference/update-reference'
import type { ListingDocument } from '@echo/firestore/types/model/listing-document'
import { ListingError } from '@echo/model/constants/errors/listing-error'
import { ListingState } from '@echo/model/constants/listing-state'
import { shouldLockListing } from '@echo/model/helpers/listing/should-lock-listing'
import type { Slug } from '@echo/model/types/slug'
import { isNil } from 'ramda'

export async function updateListingState(slug: Slug, state: ListingState): Promise<ListingDocument> {
  const snapshot = await getListingSnapshot(slug)
  if (isNil(snapshot)) {
    return Promise.reject(Error(ListingError.NotFound))
  }
  const listing = snapshot.data()
  if (listing.state === state) {
    return listing
  }
  if (listing.locked) {
    return Promise.reject(Error(ListingError.Locked))
  }
  return updateReference({
    collectionReference: listingsCollection(),
    id: snapshot.id,
    data: { state, locked: shouldLockListing(state) }
  })
}
