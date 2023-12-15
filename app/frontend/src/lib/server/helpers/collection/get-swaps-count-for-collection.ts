import type { CollectionSwapsCount } from '@echo/firestore/types/model/collection-swaps-count/collection-swaps-count'
import { find, isNil, propEq } from 'ramda'

export function getSwapsCountForCollection(collectionId: string, swapsCounts: CollectionSwapsCount[]) {
  const swapsCount: CollectionSwapsCount | undefined = find(propEq(collectionId, 'collectionId'), swapsCounts)
  if (isNil(swapsCount)) {
    return 0
  }
  return swapsCount.swapsCount
}
