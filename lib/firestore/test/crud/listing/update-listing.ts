import { getListingSnapshot } from '@echo/firestore/crud/listing/get-listing'
import { listingsCollection } from '@echo/firestore/helpers/collection/collections'
import { updateReference } from '@echo/firestore/helpers/reference/update-reference'
import type { ListingDocument } from '@echo/firestore/types/model/listing-document'
import { ListingError } from '@echo/model/constants/errors/listing-error'
import { isNil } from 'ramda'

export async function updateListing(slug: Lowercase<string>, data: Partial<ListingDocument>): Promise<ListingDocument> {
  const snapshot = await getListingSnapshot(slug)
  if (isNil(snapshot)) {
    return Promise.reject(Error(ListingError.NotFound))
  }
  return updateReference<ListingDocument>({
    collectionReference: listingsCollection(),
    id: snapshot.id,
    data
  })
}
