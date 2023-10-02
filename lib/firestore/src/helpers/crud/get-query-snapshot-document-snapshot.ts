import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { QueryDocumentSnapshot, QuerySnapshot } from 'firebase-admin/lib/firestore'
import { head } from 'ramda'

export function getQuerySnapshotDocumentSnapshot<T>(
  querySnapshot: QuerySnapshot<T>
): QueryDocumentSnapshot<T> | undefined {
  if (querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)) {
    return undefined
  }
  return head(querySnapshot.docs)!
}
