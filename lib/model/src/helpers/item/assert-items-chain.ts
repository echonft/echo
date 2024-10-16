import { ItemError } from '@echo/model/constants/errors/item-error'
import type { Item } from '@echo/model/types/item/item'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { __, gt, length, map, path, pipe, uniq } from 'ramda'

export function assertItemsChain(items: Item[]): Item[] {
  if (pipe(map(nonNullableReturn(path(['token', 'contract', 'chain']))), uniq, length, gt(__, 1))(items)) {
    throw Error(ItemError.Chain)
  }
  return items
}
