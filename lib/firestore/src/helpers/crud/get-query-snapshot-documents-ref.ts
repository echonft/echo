import { querySnapshotIsEmpty } from '@echo/firestore/helpers/crud/query-snapshot-is-empty'
import { DocumentReference, type QuerySnapshot } from 'firebase-admin/firestore'
import { invoker, map } from 'ramda'

export function getQuerySnapshotDocumentsRef<T>(querySnapshot: QuerySnapshot<T>): DocumentReference<T>[] {
  if (querySnapshotIsEmpty(querySnapshot)) {
    return [] as DocumentReference<T>[]
  }
  return map(invoker(0, 'ref'), querySnapshot.docs) as DocumentReference<T>[]
}
