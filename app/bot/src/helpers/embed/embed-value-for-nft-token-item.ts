import type { Item } from '@echo/model/types/item'
import type { NftToken } from '@echo/model/types/token'

export function embedValueForNftTokenItem(item: Item<NftToken>): string {
  return `${item.token.collection.name} #${item.token.tokenId}`
}
