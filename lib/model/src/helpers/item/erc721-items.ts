import type { Item, Items } from '@echo/model/types/item'
import type { Erc721Token } from '@echo/model/types/token'
import { prop } from 'ramda'

export function erc721Items(items: Items): Item<Erc721Token>[] {
  return prop('erc721', items)
}
