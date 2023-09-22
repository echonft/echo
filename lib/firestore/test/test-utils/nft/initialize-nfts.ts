import { CollectionName } from '@echo/firestore/constants/collection-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { nftDocumentDataMock } from '@echo/firestore-mocks/nft/nft-document-data-mock'

export async function initializeNfts() {
  const nfts = Object.values(nftDocumentDataMock)
  for (const nft of nfts) {
    await firestoreApp().collection(CollectionName.NFTS).doc(nft.id).set(nft)
  }
}
