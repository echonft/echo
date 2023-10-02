import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { QuerySnapshot } from 'firebase-admin/lib/firestore'
import { invoker, map } from 'ramda'

export function getQuerySnapshotDocumentsData<T>(querySnapshot: QuerySnapshot<T>): T[] {
  if (querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)) {
    return [] as T[]
  }
  return map(invoker(0, 'data'), querySnapshot.docs) as T[]
}
