import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference/collection-reference-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { SwapPost } from '@echo/firestore/types/model/swap-post/swap-post'
import { CollectionReference } from 'firebase-admin/firestore'

export function getSwapPostsCollectionReference(): CollectionReference<SwapPost, SwapPost> {
  return firestoreApp().collection(CollectionReferenceName.SWAP_POSTS) as CollectionReference<SwapPost, SwapPost>
}
