import { offerThreadsCollection } from '@echo/firestore/helpers/collection/collections'
import { deleteReference } from '@echo/firestore/helpers/reference/delete-reference'

export async function deleteOfferThread(id: string): Promise<void> {
  await deleteReference({
    collectionReference: offerThreadsCollection(),
    id
  })
}
