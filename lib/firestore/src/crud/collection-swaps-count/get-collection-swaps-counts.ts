import { getCollectionSwapsCountCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collection-swaps-count-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryLimit } from '@echo/firestore/helpers/crud/query/query-limit'
import { queryOrderBy } from '@echo/firestore/helpers/crud/query/query-order-by'
import type { CollectionSwapsCount } from '@echo/firestore/types/model/collection-swaps-count/collection-swaps-count'
import { pipe } from 'ramda'

export async function getCollectionSwapsCounts(limit?: number): Promise<CollectionSwapsCount[]> {
  return pipe(
    getCollectionSwapsCountCollectionReference,
    queryOrderBy('swapsCount', 'desc'),
    queryLimit(limit),
    getQueryData
  )()
}
