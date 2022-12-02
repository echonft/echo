import { FirebaseDocument } from '../types'
import { DocumentData, DocumentSnapshot } from '../types/firestore'
import { firebaseDocRef } from './firebase-doc-ref'
import { DocumentReference, getDoc } from 'firebase/firestore'

/**
 * Get the document snapshot from a path and segment. Syntax sugar for typing
 * @param path The firebase path
 * @param segment The document id
 */
export function firebaseDocSnapshotFromPath<T extends DocumentData>(
  path: FirebaseDocument,
  segment: string
): Promise<DocumentSnapshot<T>> {
  return getDoc(firebaseDocRef<T>(path, segment) as DocumentReference<T>)
}
