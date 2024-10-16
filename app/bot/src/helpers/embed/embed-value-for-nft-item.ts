import type { Erc1155Item } from '@echo/model/types/item/erc1155-item'
import type { Erc721Item } from '@echo/model/types/item/erc721-item'

export function embedValueForNftItem(item: Erc721Item | Erc1155Item): string {
  return `${item.token.collection.name} #${item.token.tokenId}`
}
