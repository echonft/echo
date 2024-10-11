import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { type DocumentData, QuerySnapshot } from 'firebase-admin/firestore'

export function querySnapshotIsEmpty<AppModelType, DbModelType extends DocumentData>(
  querySnapshot: QuerySnapshot<AppModelType, DbModelType>
): boolean {
  return querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)
}
