import { DocumentReference, QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { isNil } from 'ramda'

export function assertSnapshot<T>(
  snapshot: QueryDocumentSnapshot<T> | undefined
): asserts snapshot is QueryDocumentSnapshot<T> & { ref: DocumentReference<T>; exists: true; data(): T } {
  if (isNil(snapshot) || isNil(snapshot.ref) || isNil(snapshot.data()) || !snapshot.exists) {
    throw Error('snapshot does not exist')
  }
}
