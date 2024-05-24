import { getListingOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listing-offers-collection-reference'
import { deleteReference } from '@echo/firestore/helpers/crud/reference/delete-reference'

export function deleteListingOffer(id: string): Promise<string> {
  return deleteReference({
    collectionReference: getListingOffersCollectionReference(),
    id
  })
}
