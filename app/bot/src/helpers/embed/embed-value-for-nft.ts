import { Nft } from '@echo/firestore'

export function embedValueForNft(nft: Nft): string {
  return `${nft.collection.name} #${nft.tokenId}`
}
