import type { FirestoreNft } from '@echo/firestore/types/model/firestore-nft'

export function embedValueForNft(nft: Partial<FirestoreNft>): string {
  return `${nft.collection!.name} #${nft.tokenId}`
}
