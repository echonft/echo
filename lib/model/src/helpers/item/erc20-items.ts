import type { Item, Items } from '@echo/model/types/item'
import type { Erc20Token } from '@echo/model/types/token'
import { prop } from 'ramda'

export function erc20Items(items: Items): Item<Erc20Token>[] {
  return prop('erc20', items)
}
