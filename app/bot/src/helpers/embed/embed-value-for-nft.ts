import { Nft } from '@echo/firestore-types'

export function embedValueForNft(nft: Nft): string {
  return `${nft.collection.name} #${nft.tokenId}`
}
