import { getListingOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listing-offers-collection-reference'
import { deleteReference } from '@echo/firestore/helpers/crud/reference/delete-reference'
import { pipe } from 'ramda'

export function deleteListingOffer(id: string): Promise<string> {
  return pipe(getListingOffersCollectionReference, deleteReference(id))()
}
