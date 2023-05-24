import { Nft } from '@echo/model'

export function embedValueForNft(nft: Nft): string {
  return `${nft.collection.name} ${nft.name ?? '#'.concat(nft.tokenId.toString())}`
}
