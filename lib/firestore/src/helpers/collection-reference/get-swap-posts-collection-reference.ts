import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference/collection-reference-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { SwapPostDocumentData } from '@echo/firestore/types/model/swap-post/swap-post-document-data'
import { CollectionReference } from 'firebase-admin/firestore'

export function getSwapPostsCollectionReference(): CollectionReference<SwapPostDocumentData, SwapPostDocumentData> {
  return firestoreApp().collection(CollectionReferenceName.SWAP_POSTS) as CollectionReference<
    SwapPostDocumentData,
    SwapPostDocumentData
  >
}
