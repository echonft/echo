import type { CollectionReference, DocumentReference } from 'firebase-admin/firestore'

export function getReferenceById<T>(id: string): (collectionReference: CollectionReference<T>) => DocumentReference<T> {
  return function (collectionReference: CollectionReference<T>): DocumentReference<T> {
    return collectionReference.doc(id)
  }
}
