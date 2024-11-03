import { isErc721Item } from '@echo/model/helpers/item/is-erc721-item'
import type { AbstractItem, Erc721Item } from '@echo/model/types/item'
import { filter } from 'ramda'

export function erc721Items(items: AbstractItem[]): Erc721Item[] {
  return filter(isErc721Item, items)
}
