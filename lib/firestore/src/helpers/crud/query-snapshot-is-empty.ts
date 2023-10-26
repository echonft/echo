import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { type QuerySnapshot } from 'firebase-admin/firestore'

export function querySnapshotIsEmpty<T>(
  querySnapshot: QuerySnapshot<T>
): querySnapshot is QuerySnapshot<T> & Record<'empty', true> & Record<'docs', []> {
  return querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)
}
