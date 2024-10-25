import { offerThreadsCollection } from '@echo/firestore/helpers/collection/collections'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/document/get-document-snapshot-data'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/query/query-where'
import type { OfferThreadDocument } from '@echo/firestore/types/model/offer-thread-document'
import type { Nullable } from '@echo/utils/types/nullable'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getOfferThreadSnapshotByOfferId(
  offerId: string
): Promise<Nullable<QueryDocumentSnapshot<OfferThreadDocument>>> {
  return pipe(offerThreadsCollection, queryWhere('offerId', '==', offerId), getQueryUniqueDocumentSnapshot)()
}

export function getOfferThreadByOfferId(offerId: string): Promise<Nullable<OfferThreadDocument>> {
  return pipe(getOfferThreadSnapshotByOfferId, andThen(getDocumentSnapshotData))(offerId)
}
