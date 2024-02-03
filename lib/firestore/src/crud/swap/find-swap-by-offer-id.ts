import { getSwapsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-swaps-collection-reference'
import { getQueryUniqueData } from '@echo/firestore/helpers/crud/query/get-query-unique-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { Swap } from '@echo/firestore/types/model/swap/swap'
import type { Nullable } from '@echo/utils/types/nullable'
import { pipe } from 'ramda'

export function findSwapByOfferId(offerId: string): Promise<Nullable<Swap>> {
  return pipe(getSwapsCollectionReference, queryWhere('offerId', '==', offerId), getQueryUniqueData)()
}
