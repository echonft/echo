import { initializeFirestoreCollection } from '@echo/firestore/utils/initialize-firestore-collection'
import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference/collection-reference-name'

export async function initializeCollectionSwapsCounts() {
  await initializeFirestoreCollection(CollectionReferenceName.COLLECTION_SWAPS_COUNT)
}
