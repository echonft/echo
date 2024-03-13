import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference/collection-reference-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { swapPostMock } from '@echo/firestore-mocks/swap-post/swap-post-mock'

export async function initializeSwapPosts() {
  const mocks = Object.values(swapPostMock)
  for (const mock of mocks) {
    await firestoreApp().collection(CollectionReferenceName.SWAP_POSTS).doc(mock.id).set(mock)
  }
}
