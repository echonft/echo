import { getQuerySnapshot } from '@echo/firestore/helpers/crud/query/get-query-snapshot'
import { getQuerySnapshotDocumentSnapshots } from '@echo/firestore/helpers/crud/query/get-query-snapshot-document-snapshots'
import { type DocumentData, Query, QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getQueryDocumentSnapshots<AppModelType, DbModelType extends DocumentData>(
  query: Query<AppModelType, DbModelType>
): Promise<QueryDocumentSnapshot<AppModelType, DbModelType>[]> {
  return pipe(getQuerySnapshot, andThen(getQuerySnapshotDocumentSnapshots))(query)
}
