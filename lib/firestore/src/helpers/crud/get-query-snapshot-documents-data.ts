import { querySnapshotIsEmpty } from '@echo/firestore/helpers/crud/query-snapshot-is-empty'
import { type QuerySnapshot } from 'firebase-admin/firestore'
import { invoker, map } from 'ramda'

export function getQuerySnapshotDocumentsData<T>(querySnapshot: QuerySnapshot<T>): T[] {
  if (querySnapshotIsEmpty(querySnapshot)) {
    return [] as T[]
  }
  return map(invoker(0, 'data'), querySnapshot.docs) as T[]
}
