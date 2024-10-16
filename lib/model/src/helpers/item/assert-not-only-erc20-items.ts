import { ItemError } from '@echo/model/constants/errors/item-error'
import { erc20Items } from '@echo/model/helpers/item/erc20-items'
import type { Erc20Item } from '@echo/model/types/item/erc20-item'
import type { Item } from '@echo/model/types/item/item'
import { equals, length, pipe } from 'ramda'

export function assertNotOnlyErc20Items(items: (Erc20Item | Item)[]): Item[] {
  if (pipe(erc20Items, length, equals(items.length))(items)) {
    throw Error(ItemError.Erc20Only)
  }
  return items
}
