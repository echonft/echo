import { getCollectionSwapsCounts } from '@echo/firestore/crud/collection-swaps-count/get-collection-swaps-counts'
import { getCollectionForSwapsCount } from '@echo/frontend/lib/helpers/collection/get-collection-for-swaps-count'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { andThen, ascend, descend, map, pipe, prop, sortWith } from 'ramda'

export function getCollectionsWithSwapsCount(limit?: number) {
  return pipe(
    getCollectionSwapsCounts,
    andThen(
      pipe(
        map(getCollectionForSwapsCount),
        promiseAll,
        andThen(sortWith([descend(nonNullableReturn(prop('swapsCount'))), ascend(prop('name'))]))
      )
    )
  )(limit)
}
