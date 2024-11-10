import type { CollectionIndex } from '@echo/model/types/collection'
import { stringComparator } from '@echo/utils/helpers/string-comparator'

export function collectionComparator<T extends CollectionIndex>(collectionA: T, collectionB: T): number {
  return stringComparator(collectionA.slug, collectionB.slug)
}
