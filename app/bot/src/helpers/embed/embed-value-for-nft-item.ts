import type { NftItem } from '@echo/model/types/nft-item'

export function embedValueForNftItem(item: NftItem): string {
  return `${item.token.collection.name} #${item.token.tokenId}`
}
