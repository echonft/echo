import { getSwapsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-swaps-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryLimit } from '@echo/firestore/helpers/crud/query/query-limit'
import { queryOrderBy } from '@echo/firestore/helpers/crud/query/query-order-by'
import type { Swap } from '@echo/model/types/swap/swap'
import { pipe } from 'ramda'

export function getSwaps(limit?: number): Promise<Swap[]> {
  return pipe(getSwapsCollectionReference, queryOrderBy('slug', 'desc'), queryLimit(limit), getQueryData)()
}
