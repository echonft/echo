import { querySnapshotIsEmpty } from '@echo/firestore/helpers/crud/query-snapshot-is-empty'
import type { QueryDocumentSnapshot, QuerySnapshot } from 'firebase-admin/lib/firestore'
import { head } from 'ramda'

export function getQuerySnapshotDocumentSnapshot<T>(
  querySnapshot: QuerySnapshot<T>
): QueryDocumentSnapshot<T> | undefined {
  if (querySnapshotIsEmpty(querySnapshot)) {
    return undefined
  }
  return head(querySnapshot.docs)
}
