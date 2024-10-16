import { isErc1155Item } from '@echo/model/helpers/item/is-erc1155-item'
import type { Erc1155Item } from '@echo/model/types/item/erc1155-item'
import type { Item } from '@echo/model/types/item/item'
import { filter } from 'ramda'

export function erc1155Items(items: Item[]): Erc1155Item[] {
  return filter(isErc1155Item, items)
}
