import type { CollectionReference, DocumentReference } from 'firebase-admin/firestore'

export function getNewReference<T>(collectionReference: CollectionReference<T>): DocumentReference<T> {
  return collectionReference.doc()
}
