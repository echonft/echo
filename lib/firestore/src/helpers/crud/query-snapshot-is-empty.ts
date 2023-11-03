import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { QuerySnapshot } from 'firebase-admin/firestore'

export function querySnapshotIsEmpty<T>(
  querySnapshot: QuerySnapshot<T>
): querySnapshot is Omit<QuerySnapshot<T>, 'empty' | 'docs'> & Record<'empty', true> & Record<'docs', []> {
  return querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)
}
