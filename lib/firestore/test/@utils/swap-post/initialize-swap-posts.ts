import { initializeFirestoreCollection } from '@echo/firestore-test/initialize-firestore-collection'
import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference/collection-reference-name'

export async function initializeSwapPosts() {
  await initializeFirestoreCollection(CollectionReferenceName.SWAP_POSTS)
}
