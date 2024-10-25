import type { Collection } from '@echo/model/types/collection'
import { stringComparator } from '@echo/utils/comparators/string-comparator'

export function collectionByNameComparator<T extends Partial<Collection> & Required<Pick<Collection, 'name'>>>(
  collectionA: T,
  collectionB: T
): number {
  return stringComparator(collectionA.name, collectionB.name)
}
