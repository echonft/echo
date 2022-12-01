import { documentPath } from '../paths/document-path'
import { FirebaseDocument } from '../types'
import { doc, DocumentReference, getFirestore } from 'firebase/firestore'

/**
 * Get a reference of a document from a path and a segment. Syntax sugar for typing
 * @param path The firebase path
 * @param segment The document id
 */
export function firebaseDocRef<T>(path: FirebaseDocument, segment: string): DocumentReference<T> {
  return doc(getFirestore(), documentPath(path), segment) as DocumentReference<T>
}
