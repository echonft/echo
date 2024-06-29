import type { PartialCollection } from '@echo/model/types/collection'
import { stringComparator } from '@echo/utils/comparators/string-comparator'

export function collectionComparator(collectionA: PartialCollection, collectionB: PartialCollection): number {
  return stringComparator(collectionA.slug, collectionB.slug)
}
