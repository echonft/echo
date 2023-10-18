import { type DocumentReference, type QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { isNil } from 'ramda'

export function assertQueryDocumentSnapshot<T>(
  queryDocumentSnapshot: QueryDocumentSnapshot<T> | undefined
): asserts queryDocumentSnapshot is Omit<QueryDocumentSnapshot<T>, 'ref' | 'exists' | 'data'> &
  Record<'ref', DocumentReference<T>> &
  Record<'exists', true> &
  Record<'data', () => T> {
  if (
    isNil(queryDocumentSnapshot) ||
    isNil(queryDocumentSnapshot.ref) ||
    isNil(queryDocumentSnapshot.data()) ||
    !queryDocumentSnapshot.exists
  ) {
    throw Error('query document snapshot does not exist')
  }
}
