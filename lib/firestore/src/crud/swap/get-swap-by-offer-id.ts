import { getSwapsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-swaps-collection-reference'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { SwapDocumentData } from '@echo/firestore/types/model/swap/swap-document-data'
import type { Nullable } from '@echo/utils/types/nullable'
import type { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getSwapSnapshotByOfferId(
  offerId: string
): Promise<Nullable<QueryDocumentSnapshot<SwapDocumentData, SwapDocumentData>>> {
  return pipe(getSwapsCollectionReference, queryWhere('offerId', '==', offerId), getQueryUniqueDocumentSnapshot)()
}

export function getSwapByOfferId(offerId: string): Promise<Nullable<SwapDocumentData>> {
  return pipe(getSwapSnapshotByOfferId, andThen(getDocumentSnapshotData))(offerId)
}
