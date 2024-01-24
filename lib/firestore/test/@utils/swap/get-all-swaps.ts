import { getSwapsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-swaps-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import type { Swap } from '@echo/firestore/types/model/swap/swap'
import { pipe } from 'ramda'

export function getAllSwaps(): Promise<Swap[]> {
  return pipe(getSwapsCollectionReference, getQueryData)()
}
