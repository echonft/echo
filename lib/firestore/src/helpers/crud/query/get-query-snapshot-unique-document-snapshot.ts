import { querySnapshotIsEmpty } from '@echo/firestore/helpers/crud/query/query-snapshot-is-empty'
import type { NonEmptyDocumentSnapshot } from '@echo/firestore/types/non-empty-document-snapshot'
import type { Nullable } from '@echo/utils/types/nullable'
import { QuerySnapshot } from 'firebase-admin/firestore'
import { head, isNil } from 'ramda'

export function getQuerySnapshotUniqueDocumentSnapshot<T>(
  querySnapshot: QuerySnapshot<T>
): Nullable<NonEmptyDocumentSnapshot<T>> {
  if (querySnapshotIsEmpty(querySnapshot)) {
    return undefined
  }
  const docs = querySnapshot.docs
  if (docs.length > 1) {
    throw Error('query snapshot has more than 1 document')
  }
  const snapshot = head(docs)
  if (isNil(snapshot) || !snapshot.exists || isNil(snapshot.data())) {
    return undefined
  }
  return snapshot
}
