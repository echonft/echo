import { type Nft } from '@echo/model/types/nft/nft'

export function embedValueForNft(nft: Nft): string {
  return `${nft.collection.name} #${nft.tokenId}`
}
