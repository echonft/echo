import { FirebaseDocumentPath } from '../paths/document-path'
import { DocumentReference } from '@firebase/firestore'
import { doc, DocumentSnapshot, getDoc, getFirestore } from 'firebase/firestore'

/**
 * Get a reference of a document from a path and a segment. Syntax sugar for typing
 * @param path The firebase path
 * @param segment The document id
 */
export function getFirebaseDocRef<T>(path: FirebaseDocumentPath, segment: string): DocumentReference<T> {
  return doc(getFirestore(), path, segment) as DocumentReference<T>
}

/**
 * Get the document snapshot from a path and segment. Syntax sugar for typing
 * @param path The firebase path
 * @param segment The document id
 */
export function getFirebaseDocSnapshotFromPath<T>(
  path: FirebaseDocumentPath,
  segment: string | undefined
): Promise<DocumentSnapshot<T> | undefined> {
  return segment ? getDoc(getFirebaseDocRef(path, segment)) : Promise.resolve(undefined)
}

/**
 * Get the document from a path and a segment. Syntax sugar for typing
 * @param path The firebase path
 * @param segment The document id
 */
export function getFirebaseDoc<T>(path: FirebaseDocumentPath, segment: string | undefined): Promise<T | undefined> {
  return getFirebaseDocSnapshotFromPath(path, segment).then((doc) => doc && (doc.data() as T))
}

/**
 * Get the document snapshot from a ref. Syntax sugar for typing
 * @param ref The ref
 */
export function getFirebaseDocSnapshotFromRef<T>(ref: DocumentReference): Promise<DocumentSnapshot<T>> {
  return getDoc(ref).then((result) => result as DocumentSnapshot<T>)
}
