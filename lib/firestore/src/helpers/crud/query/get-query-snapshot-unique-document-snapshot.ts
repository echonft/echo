import { querySnapshotIsEmpty } from '@echo/firestore/helpers/crud/query/query-snapshot-is-empty'
import { DocumentSnapshot, QuerySnapshot } from 'firebase-admin/firestore'
import { head } from 'ramda'

export function getQuerySnapshotUniqueDocumentSnapshot<T>(
  querySnapshot: QuerySnapshot<T>
): DocumentSnapshot<T> | undefined {
  if (querySnapshotIsEmpty(querySnapshot)) {
    return undefined
  }
  if (querySnapshot.docs.length > 1) {
    throw Error('query snapshot has more than 1 document')
  }
  return head(querySnapshot.docs)
}
