import { querySnapshotIsEmpty } from '@echo/firestore/helpers/crud/query/query-snapshot-is-empty'
import { QuerySnapshot } from 'firebase-admin/firestore'

export function getQuerySnapshotCount<T>(querySnapshot: QuerySnapshot<T>): number {
  if (querySnapshotIsEmpty(querySnapshot)) {
    return 0
  }
  return querySnapshot.size
}
