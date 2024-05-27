import { getSwapPostsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-swap-posts-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type { SwapPost } from '@echo/firestore/types/model/swap-post/swap-post'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { now } from '@echo/utils/helpers/now'
import { assoc } from 'ramda'

export async function addSwapPost(post: Omit<SwapPost, 'postedAt'>): Promise<NewDocument<SwapPost>> {
  const data = assoc('postedAt', now(), post)
  const id = await setReference<SwapPost>({
    collectionReference: getSwapPostsCollectionReference(),
    data
  })
  return { id, data }
}
