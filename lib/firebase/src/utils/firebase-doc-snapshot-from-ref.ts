import { DocumentReference, DocumentSnapshot, getDoc } from 'firebase/firestore'

/**
 * Get the document snapshot from a ref. Syntax sugar for typing
 * @param ref The ref
 */
export function firebaseDocSnapshotFromRef<T>(ref: DocumentReference): Promise<DocumentSnapshot<T>> {
  return getDoc(ref).then((result) => result as DocumentSnapshot<T>)
}
