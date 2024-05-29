import type { Collection } from '@echo/model/types/collection'
import { stringComparator } from '@echo/utils/comparators/string-comparator'

export function collectionComparator<T extends Partial<Collection> & Required<Pick<Collection, 'slug'>>>(
  collectionA: T,
  collectionB: T
): number {
  return stringComparator(collectionA.slug, collectionB.slug)
}
