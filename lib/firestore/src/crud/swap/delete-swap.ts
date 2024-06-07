import { getSwapsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-swaps-collection-reference'
import { deleteReference } from '@echo/firestore/helpers/crud/reference/delete-reference'

export function deleteSwap(id: string): Promise<string> {
  return deleteReference({
    collectionReference: getSwapsCollectionReference(),
    id
  })
}
