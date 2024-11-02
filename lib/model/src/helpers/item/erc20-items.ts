import { isErc20Item } from '@echo/model/helpers/item/is-erc20-item'

import type { AbstractItem, Erc20Item } from '@echo/model/types/item'
import { filter } from 'ramda'

export function erc20Items(items: AbstractItem[]): Erc20Item[] {
  return filter(isErc20Item, items)
}
