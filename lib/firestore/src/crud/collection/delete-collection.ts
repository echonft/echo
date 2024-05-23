import { getCollectionsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collections-collection-reference'
import { deleteReference } from '@echo/firestore/helpers/crud/reference/delete-reference'

export function deleteCollection(id: string): Promise<string> {
  return deleteReference({
    collectionReference: getCollectionsCollectionReference(),
    id
  })
}
