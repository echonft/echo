import { getSwapsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-swaps-collection-reference'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { Swap } from '@echo/firestore/types/model/swap/swap'
import type { Nullable } from '@echo/utils/types/nullable'
import type { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getSwapSnapshotByOfferId(offerId: string): Promise<Nullable<QueryDocumentSnapshot<Swap>>> {
  return pipe(getSwapsCollectionReference, queryWhere('offerId', '==', offerId), getQueryUniqueDocumentSnapshot)()
}

export function getSwapByOfferId(offerId: string): Promise<Nullable<Swap>> {
  return pipe(getSwapSnapshotByOfferId, andThen(getDocumentSnapshotData))(offerId)
}
