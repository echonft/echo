import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { getAllCollectionSwapsCountMocks } from '@echo/firestore-mocks/collection-swaps-count/get-all-collection-swaps-count-mocks'

export async function initializeCollectionSwapsCounts() {
  const mocks = getAllCollectionSwapsCountMocks()
  for (const mock of mocks) {
    await firestoreApp().collection(CollectionReferenceName.COLLECTION_SWAPS_COUNT).doc(mock.id).set(mock)
  }
}
