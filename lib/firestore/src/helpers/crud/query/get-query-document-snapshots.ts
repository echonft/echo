import { getQuerySnapshot } from '@echo/firestore/helpers/crud/query/get-query-snapshot'
import { getQuerySnapshotDocumentSnapshots } from '@echo/firestore/helpers/crud/query/get-query-snapshot-document-snapshots'
import { Query, QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getQueryDocumentSnapshots<T>(query: Query<T>): Promise<QueryDocumentSnapshot<T>[]> {
  return pipe(getQuerySnapshot, andThen(getQuerySnapshotDocumentSnapshots))(query)
}
