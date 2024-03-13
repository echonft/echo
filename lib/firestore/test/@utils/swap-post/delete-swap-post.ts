import { getSwapPostsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-swap-posts-collection-reference'
import { deleteReference } from '@echo/firestore/helpers/crud/reference/delete-reference'
import { pipe } from 'ramda'

export function deleteSwapPost(id: string): Promise<string> {
  return pipe(getSwapPostsCollectionReference, deleteReference(id))()
}
