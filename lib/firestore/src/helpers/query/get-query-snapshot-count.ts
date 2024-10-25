import { querySnapshotIsEmpty } from '@echo/firestore/helpers/query/query-snapshot-is-empty'
import { QuerySnapshot } from 'firebase-admin/firestore'

export function getQuerySnapshotCount<AppModelType>(querySnapshot: QuerySnapshot<AppModelType>): number {
  if (querySnapshotIsEmpty(querySnapshot)) {
    return 0
  }
  return querySnapshot.size
}
