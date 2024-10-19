import { getSwapsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-swaps-collection-reference'
import { getReferenceById } from '@echo/firestore/helpers/crud/reference/get-reference-by-id'
import { getReferenceData } from '@echo/firestore/helpers/crud/reference/get-reference-data'
import { type SwapDocumentData } from '@echo/firestore/types/model/swap-document-data'
import type { Nullable } from '@echo/utils/types/nullable'
import type { DocumentReference } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getSwapReferenceById(id: string): DocumentReference<SwapDocumentData, SwapDocumentData> {
  return getReferenceById({
    collectionReference: getSwapsCollectionReference(),
    id
  })
}

export function getSwapById(id: string): Promise<Nullable<SwapDocumentData>> {
  return pipe(getSwapReferenceById, getReferenceData)(id)
}
