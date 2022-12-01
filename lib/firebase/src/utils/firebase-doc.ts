import { FirebaseDocument } from '../types'
import { firebaseDocSnapshotFromPath } from './firebase-doc-snapshot-from-path'

export function firebaseDoc<T>(path: FirebaseDocument, segment: string): Promise<T> {
  return firebaseDocSnapshotFromPath(path, segment).then((doc) => doc && (doc.data() as T))
}
