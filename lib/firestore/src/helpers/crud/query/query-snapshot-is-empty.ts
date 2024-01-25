import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { QuerySnapshot } from 'firebase-admin/firestore'

export function querySnapshotIsEmpty<T>(querySnapshot: QuerySnapshot<T>): boolean {
  return querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)
}
