import { getSwapsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-swaps-collection-reference'
import { getReferenceById } from '@echo/firestore/helpers/crud/reference/get-reference-by-id'
import { getReferenceData } from '@echo/firestore/helpers/crud/reference/get-reference-data'
import { type Swap } from '@echo/firestore/types/model/swap/swap'
import type { Nullable } from '@echo/utils/types/nullable'
import type { DocumentReference } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getSwapReferenceById(id: string): DocumentReference<Swap> {
  return getReferenceById<Swap>({
    collectionReference: getSwapsCollectionReference(),
    id
  })
}

export function getSwapById(id: string): Promise<Nullable<Swap>> {
  return pipe(getSwapReferenceById, getReferenceData<Swap>)(id)
}
