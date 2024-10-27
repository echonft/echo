import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import { QuerySnapshot } from 'firebase-admin/firestore'

export function querySnapshotIsEmpty<AppModelType>(querySnapshot: QuerySnapshot<AppModelType>): boolean {
  return querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)
}
