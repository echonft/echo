import { swapsCollection } from '@echo/firestore/helpers/collection/collections'
import { getReferenceById } from '@echo/firestore/helpers/reference/get-reference-by-id'
import { getReferenceData } from '@echo/firestore/helpers/reference/get-reference-data'
import { type SwapDocument } from '@echo/firestore/types/model/swap-document'
import type { Nullable } from '@echo/utils/types/nullable'
import type { DocumentReference } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getSwapReferenceById(id: string): DocumentReference<SwapDocument> {
  return getReferenceById({
    collectionReference: swapsCollection(),
    id
  })
}

export function getSwapById(id: string): Promise<Nullable<SwapDocument>> {
  return pipe(getSwapReferenceById, getReferenceData)(id)
}
