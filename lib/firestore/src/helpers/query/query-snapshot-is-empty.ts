import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { QuerySnapshot } from 'firebase-admin/firestore'

export function querySnapshotIsEmpty<AppModelType>(querySnapshot: QuerySnapshot<AppModelType>): boolean {
  return querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)
}
