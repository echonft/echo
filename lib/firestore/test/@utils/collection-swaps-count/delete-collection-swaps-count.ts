import { getCollectionSwapsCountCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collection-swaps-count-collection-reference'
import { deleteReference } from '@echo/firestore/helpers/crud/reference/delete-reference'

export function deleteCollectionSwapsCount(id: string): Promise<string> {
  return deleteReference({
    collectionReference: getCollectionSwapsCountCollectionReference(),
    id
  })
}
