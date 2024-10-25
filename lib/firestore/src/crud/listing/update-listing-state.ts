import { getListingSnapshot } from '@echo/firestore/crud/listing/get-listing'
import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import { ListingError } from '@echo/model/constants/errors/listing-error'
import { ListingState } from '@echo/model/constants/listing-state'
import { shouldLockListing } from '@echo/model/helpers/listing/should-lock-listing'
import type { Listing } from '@echo/model/types/listing'
import type { Slug } from '@echo/model/types/slug'
import { isNil } from 'ramda'

export async function updateListingState(slug: Slug, state: ListingState): Promise<Listing> {
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
    collectionReference: getListingsCollectionReference(),
    id: snapshot.id,
    data: { state, locked: shouldLockListing(state) }
  })
}
