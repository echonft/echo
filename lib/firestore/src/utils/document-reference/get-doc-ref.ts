import { doc, DocumentData, DocumentReference, getFirestore } from 'firebase/firestore'

/**
 * Get a reference of a document from a path and a segment. Syntax sugar for typing
 * @param path – The firebase path
 * @param pathSegments – Additional path segments that will be applied relative to the first argument.
 */
export function getDocRef<T extends DocumentData>(path: string, ...pathSegments: string[]): DocumentReference<T> {
  return doc(getFirestore(), path, ...pathSegments) as DocumentReference<T>
}
