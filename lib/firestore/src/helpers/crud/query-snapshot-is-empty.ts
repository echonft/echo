import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { QuerySnapshot } from 'firebase-admin/lib/firestore'

export function querySnapshotIsEmpty<T>(
  querySnapshot: QuerySnapshot<T>
): querySnapshot is QuerySnapshot<T> & Record<'empty', true> & Record<'docs', []> {
  return querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)
}
