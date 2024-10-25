import { swapPostsCollection } from '@echo/firestore/helpers/collection/collections'
import { deleteReference } from '@echo/firestore/helpers/reference/delete-reference'

export function deleteSwapPost(id: string): Promise<string> {
  return deleteReference({
    collectionReference: swapPostsCollection(),
    id
  })
}
