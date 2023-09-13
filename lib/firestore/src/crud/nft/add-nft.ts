import { CollectionName } from '@echo/firestore/constants/collection-name'
import { nftDataConverter } from '@echo/firestore/converters/nft-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreNft } from '@echo/firestore/types/model/firestore-nft'

export async function addNft(nft: Omit<FirestoreNft, 'id'>): Promise<string> {
  const reference = firestoreApp().collection(CollectionName.NFTS).doc()
  const id = reference.id
  await reference.set(nftDataConverter.toFirestore({ ...nft, id }))
  return id
}
