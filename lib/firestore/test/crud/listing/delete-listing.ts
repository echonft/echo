import { listingsCollection } from '@echo/firestore/helpers/collection/collections'
import { deleteReference } from '@echo/firestore/helpers/reference/delete-reference'

export function deleteListing(id: string): Promise<string> {
  return deleteReference({
    collectionReference: listingsCollection(),
    id
  })
}
