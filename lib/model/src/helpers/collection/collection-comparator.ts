import type { CollectionIndex } from '@echo/model/types/collection'
import { stringComparator } from '@echo/utils/helpers/string-comparator'

export function collectionComparator(collectionA: CollectionIndex, collectionB: CollectionIndex): number {
  return stringComparator(collectionA.slug, collectionB.slug)
}
