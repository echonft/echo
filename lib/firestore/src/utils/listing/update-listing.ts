import { ListingError } from '@echo/firestore/constants/errors/listing-error'
import { getListingSnapshot } from '@echo/firestore/crud/listing/get-listing'
import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import { type Listing } from '@echo/model/types/listing'
import { isNil } from 'ramda'

export async function updateListing(slug: string, data: Partial<Listing>): Promise<Listing> {
  const snapshot = await getListingSnapshot(slug)
  if (isNil(snapshot)) {
    return Promise.reject(Error(ListingError.NotFound))
  }
  return updateReference({
    collectionReference: getListingsCollectionReference(),
    id: snapshot.id,
    data
  })
}
