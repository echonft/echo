import { getSwapPostsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-swap-posts-collection-reference'
import { getReferenceById } from '@echo/firestore/helpers/crud/reference/get-reference-by-id'
import { getReferenceData } from '@echo/firestore/helpers/crud/reference/get-reference-data'
import type { SwapPost } from '@echo/firestore/types/model/swap-post/swap-post'
import type { Nullable } from '@echo/utils/types/nullable'
import type { DocumentReference } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getSwapPostReferenceById(id: string): DocumentReference<SwapPost> {
  return getReferenceById<SwapPost>({
    collectionReference: getSwapPostsCollectionReference(),
    id
  })
}

export function getSwapPostById(id: string): Promise<Nullable<SwapPost>> {
  return pipe(getSwapPostReferenceById, getReferenceData<SwapPost>)(id)
}
