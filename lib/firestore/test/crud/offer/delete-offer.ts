import { offersCollection } from '@echo/firestore/helpers/collection/collections'
import { deleteReference } from '@echo/firestore/helpers/reference/delete-reference'

export function deleteOffer(id: string): Promise<string> {
  return deleteReference({
    collectionReference: offersCollection(),
    id
  })
}
