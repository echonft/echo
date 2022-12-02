import { DocumentData, DocumentSnapshot } from '../types/firestore'
import { DocumentReference, getDoc } from 'firebase/firestore'

/**
 * Get the document snapshot from a ref. Syntax sugar for typing
 * @param ref The ref
 */
export function firebaseDocSnapshotFromRef<T extends DocumentData>(
  ref: DocumentReference<T>
): Promise<DocumentSnapshot<T>> {
  return getDoc(ref).then((result) => result as DocumentSnapshot<T>)
}
