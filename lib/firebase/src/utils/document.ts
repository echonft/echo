import { FirebaseDocument } from '../types'
import { DocumentData, DocumentSnapshot } from '../types/firestore'
import { firebaseDocSnapshotFromPath } from './firebase-doc-snapshot-from-path'

export function document<T extends DocumentData, U = T>(
  id: string,
  collection: FirebaseDocument,
  mapper?: (snapshot: DocumentSnapshot<T>) => Promise<U>
): Promise<U> {
  if (!mapper) {
    return firebaseDocSnapshotFromPath<T>(collection, id) as Promise<U>
  }
  return firebaseDocSnapshotFromPath<T>(collection, id).then(mapper)
}
