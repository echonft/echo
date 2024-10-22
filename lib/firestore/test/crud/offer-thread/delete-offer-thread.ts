import { getOfferThreadsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-threads-collection-reference'
import { deleteReference } from '@echo/firestore/helpers/crud/reference/delete-reference'

export async function deleteOfferThread(id: string): Promise<void> {
  await deleteReference({
    collectionReference: getOfferThreadsCollectionReference(),
    id
  })
}
