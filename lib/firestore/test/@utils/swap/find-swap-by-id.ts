import { getSwapsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-swaps-collection-reference'
import { getQueryUniqueData } from '@echo/firestore/helpers/crud/query/get-query-unique-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { type Swap } from '@echo/firestore/types/model/swap/swap'
import { pipe } from 'ramda'

export function findSwapById(id: string): Promise<Swap | undefined> {
  return pipe(getSwapsCollectionReference, queryWhere('id', '==', id), getQueryUniqueData)()
}
