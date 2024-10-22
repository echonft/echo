import { getSwapPostsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-swap-posts-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type { SwapPostDocumentData } from '@echo/firestore/types/model/swap-post-document-data'

export async function addSwapPost(data: SwapPostDocumentData): Promise<string> {
  return setReference<SwapPostDocumentData, SwapPostDocumentData>({
    collectionReference: getSwapPostsCollectionReference(),
    data
  })
}
