import { getNftsCollection } from '@echo/firestore/helpers/collection/get-nfts-collection'
import type { FirestoreNft } from '@echo/firestore/types/model/nft/firestore-nft'

export async function addNft(nft: Omit<FirestoreNft, 'id'>): Promise<FirestoreNft> {
  const reference = getNftsCollection().doc()
  const id = reference.id
  const newNft = { ...nft, id } as FirestoreNft
  await reference.set(newNft)
  return newNft
}
