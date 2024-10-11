import type { Item, Items } from '@echo/model/types/item'
import type { Erc1155Token } from '@echo/model/types/token'
import { prop } from 'ramda'

export function erc1155Items(items: Items): Item<Erc1155Token>[] {
  return prop('erc1155', items)
}
