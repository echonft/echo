import { querySnapshotIsEmpty } from '@echo/firestore/helpers/crud/query/query-snapshot-is-empty'
import type { Nullable } from '@echo/utils/types/nullable'
import { QueryDocumentSnapshot, QuerySnapshot } from 'firebase-admin/firestore'
import { head } from 'ramda'

export function getQuerySnapshotUniqueDocumentSnapshot<T>(
  querySnapshot: QuerySnapshot<T>
): Nullable<QueryDocumentSnapshot<T>> {
  if (querySnapshotIsEmpty(querySnapshot)) {
    return undefined
  }
  const docs = querySnapshot.docs
  if (docs.length > 1) {
    throw Error('query snapshot has more than 1 document')
  }
  return head(docs)
}
