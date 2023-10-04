import { DocumentReference, QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { isNil } from 'ramda'

export function assertQueryDocumentSnapshot<T>(
  snapshot: QueryDocumentSnapshot<T> | undefined
): asserts snapshot is QueryDocumentSnapshot<T> & { ref: DocumentReference<T>; exists: true; data(): T } {
  if (isNil(snapshot) || isNil(snapshot.ref) || isNil(snapshot.data()) || !snapshot.exists) {
    throw Error('query document snapshot does not exist')
  }
}
