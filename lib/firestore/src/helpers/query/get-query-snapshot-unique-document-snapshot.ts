import { QueryErrorCode } from '@echo/firestore/constants/errors/query-error'
import { querySnapshotIsEmpty } from '@echo/firestore/helpers/query/query-snapshot-is-empty'
import type { Nullable } from '@echo/utils/types/nullable'
import { QueryDocumentSnapshot, QuerySnapshot } from 'firebase-admin/firestore'
import { head } from 'ramda'

export function getQuerySnapshotUniqueDocumentSnapshot<AppModelType>(
  querySnapshot: QuerySnapshot<AppModelType>
): Nullable<QueryDocumentSnapshot<AppModelType>> {
  if (querySnapshotIsEmpty(querySnapshot)) {
    return undefined
  }
  const docs = querySnapshot.docs
  if (docs.length > 1) {
    throw Error(QueryErrorCode.DocumentNotUnique)
  }
  return head(docs)
}
