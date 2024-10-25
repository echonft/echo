import { ItemError } from '@echo/model/constants/errors/item-error'
import { erc20Items } from '@echo/model/helpers/item/erc20-items'
import type { AbstractItem } from '@echo/model/types/abstract-item'
import { equals, length, pipe } from 'ramda'

export function assertNotOnlyErc20Items<T extends AbstractItem>(items: T[]): T[] {
  if (pipe(erc20Items, length, equals(items.length))(items)) {
    throw Error(ItemError.Erc20Only)
  }
  return items
}
