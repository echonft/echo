import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { getAllNftMocks } from '@echo/model-mocks/nft/get-all-nft-mocks'

export async function initializeNfts() {
  const nfts = getAllNftMocks()
  for (const nft of nfts) {
    await firestoreApp().collection(CollectionReferenceName.NFTS).doc(nft.id).set(nft)
  }
}
