import { ItemError } from '@echo/model/constants/errors/item-error'
import type { AbstractItem } from '@echo/model/types/abstract-item'
import { listElementsEq } from '@echo/utils/fp/list-elements-eq'
import { complement, map, path, pipe } from 'ramda'

export function assertItemsChain<T extends AbstractItem>(items: T[]): T[] {
  if (complement(pipe(map(path(['token', 'contract', 'chain'])), listElementsEq))(items)) {
    throw Error(ItemError.Chain)
  }
  return items
}
