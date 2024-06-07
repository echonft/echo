import { getSwapPostsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-swap-posts-collection-reference'
import { deleteReference } from '@echo/firestore/helpers/crud/reference/delete-reference'

export function deleteSwapPost(id: string): Promise<string> {
  return deleteReference({
    collectionReference: getSwapPostsCollectionReference(),
    id
  })
}
