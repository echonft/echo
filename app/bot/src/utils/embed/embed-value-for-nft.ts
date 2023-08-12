import { FirestoreNftData } from '@echo/firestore'

export function embedValueForNft(nft: FirestoreNftData): string {
  return `${nft.collection.name} #${nft.tokenId}`
}
