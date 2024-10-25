import { swapPostsCollection } from '@echo/firestore/helpers/collection/collections'
import { setReference } from '@echo/firestore/helpers/reference/set-reference'
import type { SwapPostDocument } from '@echo/firestore/types/model/swap-post-document'

export async function addSwapPost(data: SwapPostDocument): Promise<string> {
  return setReference({
    collectionReference: swapPostsCollection(),
    data
  })
}
