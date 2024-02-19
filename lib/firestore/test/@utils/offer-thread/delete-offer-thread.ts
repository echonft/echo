import { getOfferThreadsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-threads-collection-reference'
import { deleteReference } from '@echo/firestore/helpers/crud/reference/delete-reference'
import { pipe } from 'ramda'

export function deleteOfferThread(id: string): Promise<string> {
  return pipe(getOfferThreadsCollectionReference, deleteReference(id))()
}
