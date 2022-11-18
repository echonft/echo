import { FirebaseDocument, FirebaseDocumentPath } from '../paths/document-path'
import { doc, DocumentReference, DocumentSnapshot, getDoc, getFirestore } from 'firebase/firestore'
import { FirebaseUser } from 'models/user'

/**
 * Get a reference of a document from a path and a segment. Syntax sugar for typing
 * @param path The firebase path
 * @param segment The document id
 */
function getFirebaseDocRef<T>(path: FirebaseDocument, segment: string): DocumentReference<T> {
  return doc(getFirestore(), FirebaseDocumentPath(path)!, segment) as DocumentReference<T>
}

/**
 * Get the document snapshot from a path and segment. Syntax sugar for typing
 * @param path The firebase path
 * @param segment The document id
 */
export function getFirebaseDocSnapshotFromPath<T>(
  path: FirebaseDocument,
  segment: string
): Promise<DocumentSnapshot<T>> {
  return getDoc(getFirebaseDocRef(path, segment))
}

/**
 * Get the document from a path and a segment. Syntax sugar for typing
 * @param path The firebase path
 * @param segment The document id
 */
export function getFirebaseDoc<T>(path: FirebaseDocument, segment: string): Promise<T> {
  return getFirebaseDocSnapshotFromPath(path, segment).then((doc) => doc && (doc.data() as T))
}

/**
 * Get the document snapshot from a ref. Syntax sugar for typing
 * @param ref The ref
 */
export function getFirebaseDocSnapshotFromRef<T>(ref: DocumentReference): Promise<DocumentSnapshot<T>> {
  return getDoc(ref).then((result) => result as DocumentSnapshot<T>)
}

export function getDocument<T, U = T>(
  id: string,
  collection: FirebaseDocument,
  mapper?: (snapshot: DocumentSnapshot<T>) => Promise<U>
): Promise<U> {
  if (!mapper) {
    return getFirebaseDocSnapshotFromPath<T>(collection, id) as Promise<U>
  }
  return getFirebaseDocSnapshotFromPath<T>(collection, id).then(mapper)
}
