import { FirestoreSnapshot } from '../../types/abstract/firestore-snapshot'
import { DocumentData, DocumentReference } from 'firebase-admin/firestore'

/**
 * Get the document from a document reference
 * @param ref The document reference
 */
export const getDocSnapshotFromRef = <T extends DocumentData>(
  ref: DocumentReference<T>
): Promise<FirestoreSnapshot<T>> => ref.get()
