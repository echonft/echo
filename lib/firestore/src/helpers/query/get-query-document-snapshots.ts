import { getQuerySnapshot } from '@echo/firestore/helpers/query/get-query-snapshot'
import { getQuerySnapshotDocumentSnapshots } from '@echo/firestore/helpers/query/get-query-snapshot-document-snapshots'
import { Query, QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getQueryDocumentSnapshots<AppModelType>(
  query: Query<AppModelType>
): Promise<QueryDocumentSnapshot<AppModelType>[]> {
  return pipe(getQuerySnapshot, andThen(getQuerySnapshotDocumentSnapshots))(query)
}
