import { getOfferThreadsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-threads-collection-reference'
import { deleteReference } from '@echo/firestore/helpers/crud/reference/delete-reference'

export function deleteOfferThread(id: string): Promise<string> {
  return deleteReference({
    collectionReference: getOfferThreadsCollectionReference(),
    id
  })
}
