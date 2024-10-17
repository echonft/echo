import { getListingSnapshot } from '@echo/firestore/crud/listing/get-listing'
import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import { ListingError } from '@echo/model/constants/errors/listing-error'
import type { ListingState } from '@echo/model/constants/listing-state'
import type { Listing } from '@echo/model/types/listing/listing'
import type { Slug } from '@echo/model/types/slug'
import { isNil } from 'ramda'

export async function updateListingState(slug: Slug, state: ListingState): Promise<Listing> {
  const snapshot = await getListingSnapshot(slug)
  if (isNil(snapshot)) {
    return Promise.reject(Error(ListingError.NotFound))
  }
  return updateReference({
    collectionReference: getListingsCollectionReference(),
    id: snapshot.id,
    data: { state }
  })
}
