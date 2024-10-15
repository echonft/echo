import { getOfferThreadsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-threads-collection-reference'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { OfferThreadDocumentData } from '@echo/firestore/types/model/offer-thread-document-data'
import type { Nullable } from '@echo/utils/types/nullable'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getOfferThreadSnapshot(
  offerId: string
): Promise<Nullable<QueryDocumentSnapshot<OfferThreadDocumentData, OfferThreadDocumentData>>> {
  return pipe(
    getOfferThreadsCollectionReference,
    queryWhere('offerId', '==', offerId),
    getQueryUniqueDocumentSnapshot
  )()
}

export function getOfferThread(offerId: string): Promise<Nullable<OfferThreadDocumentData>> {
  return pipe(getOfferThreadSnapshot, andThen(getDocumentSnapshotData))(offerId)
}
