import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { type Nft } from '@echo/model/types/nft'
import { now } from '@echo/utils/helpers/now'

export async function addNft(nft: Omit<Nft, 'id' | 'updatedAt'>): Promise<Nft> {
  const reference = getNftsCollectionReference().doc()
  const id = reference.id
  const newNft = { ...nft, id, updatedAt: now() } as Nft
  await reference.set(newNft)
  return newNft
}
