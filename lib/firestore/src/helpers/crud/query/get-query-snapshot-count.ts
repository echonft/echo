import { querySnapshotIsEmpty } from '@echo/firestore/helpers/crud/query/query-snapshot-is-empty'
import { type DocumentData, QuerySnapshot } from 'firebase-admin/firestore'

export function getQuerySnapshotCount<AppModelType, DbModelType extends DocumentData>(
  querySnapshot: QuerySnapshot<AppModelType, DbModelType>
): number {
  if (querySnapshotIsEmpty(querySnapshot)) {
    return 0
  }
  return querySnapshot.size
}
