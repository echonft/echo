import { getSwapsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-swaps-collection-reference'
import { getReferenceById } from '@echo/firestore/helpers/crud/reference/get-reference-by-id'
import { getReferenceData } from '@echo/firestore/helpers/crud/reference/get-reference-data'
import type { Swap } from '@echo/firestore/types/model/swap/swap'
import type { Nullable } from '@echo/utils/types/nullable'
import { pipe } from 'ramda'

export function getSwapById(id: string): Promise<Nullable<Swap>> {
  return pipe(
    getReferenceById<Swap>,
    getReferenceData<Swap>
  )({ collectionReference: getSwapsCollectionReference(), id })
}
