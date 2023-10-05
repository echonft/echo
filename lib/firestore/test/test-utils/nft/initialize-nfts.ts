import { CollectionName } from '@echo/firestore/constants/collection-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { getAllNftMocks } from '@echo/firestore-mocks/nft/get-all-nft-mocks'

export async function initializeNfts() {
  const nfts = getAllNftMocks()
  for (const nft of nfts) {
    await firestoreApp().collection(CollectionName.NFTS).doc(nft.id).set(nft)
  }
}
