import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { deleteReference } from '@echo/firestore/helpers/crud/reference/delete-reference'
import { pipe } from 'ramda'

export function deleteOffer(id: string): Promise<string> {
  return pipe(getOffersCollectionReference, deleteReference(id))()
}
