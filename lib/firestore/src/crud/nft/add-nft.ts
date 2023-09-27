import { CollectionName } from '@echo/firestore/constants/collection-name'
import { nftDataConverter } from '@echo/firestore/converters/nft/nft-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreNft } from '@echo/firestore/types/model/nft/firestore-nft'

export async function addNft(nft: Omit<FirestoreNft, 'id'>): Promise<FirestoreNft> {
  const reference = firestoreApp().collection(CollectionName.NFTS).doc()
  const id = reference.id
  const newNft = { ...nft, id } as FirestoreNft
  await reference.set(nftDataConverter.toFirestore(newNft))
  return newNft
}
