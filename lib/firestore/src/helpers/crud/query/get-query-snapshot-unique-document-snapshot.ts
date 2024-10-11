import { querySnapshotIsEmpty } from '@echo/firestore/helpers/crud/query/query-snapshot-is-empty'
import type { Nullable } from '@echo/utils/types/nullable'
import { type DocumentData, QueryDocumentSnapshot, QuerySnapshot } from 'firebase-admin/firestore'
import { head } from 'ramda'

export function getQuerySnapshotUniqueDocumentSnapshot<AppModelType, DbModelType extends DocumentData>(
  querySnapshot: QuerySnapshot<AppModelType, DbModelType>
): Nullable<QueryDocumentSnapshot<AppModelType, DbModelType>> {
  if (querySnapshotIsEmpty(querySnapshot)) {
    return undefined
  }
  const docs = querySnapshot.docs
  if (docs.length > 1) {
    throw Error('query snapshot has more than 1 document')
  }
  return head(docs)
}
