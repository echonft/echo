import { type Nft } from '@echo/model/types/nft'

export function embedValueForNft(nft: Partial<Nft>): string {
  return `${nft.collection!.name} #${nft.tokenId}`
}
