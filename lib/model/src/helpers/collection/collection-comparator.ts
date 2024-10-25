import type { CollectionIndex } from '@echo/model/types/collection'
import { stringComparator } from '@echo/utils/comparators/string-comparator'

export function collectionComparator(collectionA: CollectionIndex, collectionB: CollectionIndex): number {
  return stringComparator(collectionA.slug, collectionB.slug)
}
