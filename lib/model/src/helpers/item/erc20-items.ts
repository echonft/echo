import { isErc20Item } from '@echo/model/helpers/item/is-erc20-item'
import type { Erc20Item } from '@echo/model/types/item/erc20-item'
import type { Item } from '@echo/model/types/item/item'
import { filter } from 'ramda'

export function erc20Items(items: Item[]): Erc20Item[] {
  return filter(isErc20Item, items)
}
