import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { QuerySnapshot } from 'firebase-admin/lib/firestore'
import { invoker, map } from 'ramda'

export function getQuerySnapshotDocumentsData<T>(querySnapshot: QuerySnapshot<T>): Array<T> {
  if (querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)) {
    return [] as Array<T>
  }
  return map(invoker(0, 'data'), querySnapshot.docs) as Array<T>
}
