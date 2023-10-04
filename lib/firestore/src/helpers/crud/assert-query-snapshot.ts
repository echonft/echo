import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { QueryDocumentSnapshot, QuerySnapshot } from 'firebase-admin/lib/firestore'
import { isNil } from 'ramda'

export function assertQuerySnapshot<T>(
  snapshot: QuerySnapshot<T> | undefined
): asserts snapshot is QuerySnapshot<T> & { empty: false; docs: NonEmptyArray<QueryDocumentSnapshot<T>> } {
  if (isNil(snapshot) || snapshot.empty || isNilOrEmpty(snapshot.docs)) {
    throw Error('query snapshot does not exist')
  }
}
