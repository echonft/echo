import { CollectionName } from '@echo/firestore/constants/collection-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { nftCollectionDocumentDataMock } from '@echo/firestore-mocks/nft-collection/nft-collection-document-data-mock'

export async function initializeNftCollections() {
  const nftCollections = Object.values(nftCollectionDocumentDataMock)
  for (const collection of nftCollections) {
    await firestoreApp().collection(CollectionName.NFT_COLLECTIONS).doc(collection.id).set(collection)
  }
}
