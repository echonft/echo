import { collectionsCollection } from '@echo/firestore/helpers/collection/collections'
import { deleteReference } from '@echo/firestore/helpers/reference/delete-reference'

export function deleteCollection(id: string): Promise<string> {
  return deleteReference({
    collectionReference: collectionsCollection(),
    id
  })
}
