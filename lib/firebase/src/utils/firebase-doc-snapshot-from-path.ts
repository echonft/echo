import { FirebaseDocument } from '../types'
import { firebaseDocRef } from './firebase-doc-ref'
import { DocumentSnapshot, getDoc } from 'firebase/firestore'

/**
 * Get the document snapshot from a path and segment. Syntax sugar for typing
 * @param path The firebase path
 * @param segment The document id
 */
export function firebaseDocSnapshotFromPath<T>(path: FirebaseDocument, segment: string): Promise<DocumentSnapshot<T>> {
  return getDoc(firebaseDocRef(path, segment))
}
