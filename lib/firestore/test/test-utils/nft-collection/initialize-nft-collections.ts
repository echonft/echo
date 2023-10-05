import { CollectionName } from '@echo/firestore/constants/collection-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { getAllNftCollectionMocks } from '@echo/firestore-mocks/nft-collection/get-all-nft-collection-mocks'

export async function initializeNftCollections() {
  const nftCollections = getAllNftCollectionMocks()
  for (const collection of nftCollections) {
    await firestoreApp().collection(CollectionName.NFT_COLLECTIONS).doc(collection.id).set(collection)
  }
}
