import { swapsCollection } from '@echo/firestore/helpers/collection/collections'
import { deleteReference } from '@echo/firestore/helpers/reference/delete-reference'

export function deleteSwap(id: string): Promise<string> {
  return deleteReference({
    collectionReference: swapsCollection(),
    id
  })
}
