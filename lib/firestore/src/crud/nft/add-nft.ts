import { getNftsCollection } from '@echo/firestore/helpers/collection/get-nfts-collection'
import type { FirestoreNft } from '@echo/firestore/types/model/nft/firestore-nft'
import dayjs from 'dayjs'

export async function addNft(nft: Omit<FirestoreNft, 'id' | 'updatedAt'>): Promise<FirestoreNft> {
  const reference = getNftsCollection().doc()
  const id = reference.id
  const newNft = { ...nft, id, updatedAt: dayjs().unix() } as FirestoreNft
  await reference.set(newNft)
  return newNft
}
