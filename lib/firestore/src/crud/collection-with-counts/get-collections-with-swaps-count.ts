import { getCollectionSwapsCounts } from '@echo/firestore/crud/collection-swaps-count/get-collection-swaps-counts'
import { getCollectionBySwapsCount } from '@echo/firestore/crud/collection/get-collection-by-swaps-count'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { andThen, ascend, descend, map, pipe, prop, sortWith } from 'ramda'

export function getCollectionsWithSwapsCount(limit?: number) {
  return pipe(
    getCollectionSwapsCounts,
    andThen(
      pipe(
        map(getCollectionBySwapsCount),
        promiseAll,
        andThen(sortWith([descend(nonNullableReturn(prop('swapsCount'))), ascend(prop('name'))]))
      )
    )
  )(limit)
}
