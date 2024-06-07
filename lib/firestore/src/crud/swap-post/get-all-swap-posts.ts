import { getSwapPostsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-swap-posts-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import type { SwapPost } from '@echo/firestore/types/model/swap-post/swap-post'
import { pipe } from 'ramda'

export function getAllSwapPosts(): Promise<SwapPost[]> {
  return pipe(getSwapPostsCollectionReference, getQueryData)()
}
