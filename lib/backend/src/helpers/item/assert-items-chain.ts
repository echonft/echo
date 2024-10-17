import { ItemError } from '@echo/model/constants/errors/item-error'
import type { Item } from '@echo/model/types/item/item'
import { listElementsEq } from '@echo/utils/fp/list-elements-eq'
import { complement, map, path, pipe } from 'ramda'

export function assertItemsChain<T extends Item>(items: T[]): T[] {
  if (complement(pipe(map(path(['token', 'contract', 'chain'])), listElementsEq))(items)) {
    throw Error(ItemError.Chain)
  }
  return items
}
