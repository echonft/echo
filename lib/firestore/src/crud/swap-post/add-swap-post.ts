import { getSwapById } from '@echo/firestore/crud/swap/get-swap-by-id'
import { getSwapPostsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-swap-posts-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type { SwapPost } from '@echo/firestore/types/model/swap-post/swap-post'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { now } from '@echo/utils/helpers/now'
import { assoc, isNil } from 'ramda'

export async function addSwapPost(swapPost: Omit<SwapPost, 'postedAt'>): Promise<NewDocument<SwapPost>> {
  const swap = await getSwapById(swapPost.swapId)
  if (isNil(swap)) {
    throw Error(`trying to add post for swap with id ${swapPost.swapId} but this swap does not exist`)
  }
  const data = assoc('postedAt', now(), swapPost)
  const id = await setReference<SwapPost>({
    collectionReference: getSwapPostsCollectionReference(),
    data
  })
  return { id, data }
}
