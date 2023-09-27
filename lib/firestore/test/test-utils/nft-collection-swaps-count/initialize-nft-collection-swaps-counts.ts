import { CollectionName } from '@echo/firestore/constants/collection-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { getAllNftCollectionSwapsCountMocks } from '@echo/firestore-mocks/nft-collection-swaps-count/get-all-nft-collection-swaps-count-mocks'

export async function initializeNftCollectionSwapsCounts() {
  const mocks = getAllNftCollectionSwapsCountMocks()
  for (const mock of mocks) {
    await firestoreApp().collection(CollectionName.NFT_COLLECTION_SWAPS_COUNT).doc(mock.id).set(mock)
  }
}
