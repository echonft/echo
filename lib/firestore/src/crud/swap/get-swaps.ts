import { swapsCollection } from '@echo/firestore/helpers/collection/collections'
import { getQueryData } from '@echo/firestore/helpers/query/get-query-data'
import { queryLimit } from '@echo/firestore/helpers/query/query-limit'
import { queryOrderBy } from '@echo/firestore/helpers/query/query-order-by'
import type { SwapDocument } from '@echo/firestore/types/model/swap-document'
import { pipe } from 'ramda'

export function getSwaps(limit?: number): Promise<SwapDocument[]> {
  return pipe(swapsCollection, queryOrderBy('slug', 'desc'), queryLimit(limit), getQueryData)()
}
