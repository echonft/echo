import type { NftItem } from '@echo/model/types/item'

export function embedValueForNftItem(item: NftItem): string {
  return `${item.token.collection.name} #${item.token.tokenId}`
}
