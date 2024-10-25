import { swapsCollection } from '@echo/firestore/helpers/collection/collections'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/document/get-document-snapshot-data'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/query/query-where'
import type { SwapDocument } from '@echo/firestore/types/model/swap-document'
import type { Nullable } from '@echo/utils/types/nullable'
import type { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

function getSwapSnapshotByOfferId(offerId: string): Promise<Nullable<QueryDocumentSnapshot<SwapDocument>>> {
  return pipe(swapsCollection, queryWhere('offerId', '==', offerId), getQueryUniqueDocumentSnapshot)()
}

export function getSwapByOfferId(offerId: string): Promise<Nullable<SwapDocument>> {
  return pipe(getSwapSnapshotByOfferId, andThen(getDocumentSnapshotData))(offerId)
}
