import { FirebaseDocument } from '../types'
import { firebaseDocSnapshotFromPath } from './firebase-doc-snapshot-from-path'
import { DocumentSnapshot } from 'firebase/firestore'

export function document<T, U = T>(
  id: string,
  collection: FirebaseDocument,
  mapper?: (snapshot: DocumentSnapshot<T>) => Promise<U>
): Promise<U> {
  if (!mapper) {
    return firebaseDocSnapshotFromPath<T>(collection, id) as Promise<U>
  }
  return firebaseDocSnapshotFromPath<T>(collection, id).then(mapper)
}
