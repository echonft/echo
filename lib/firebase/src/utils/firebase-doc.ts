import { FirebaseDocumentNotError } from '../errors/firebase-document-not-found-error'
import { FirebaseDocument } from '../types'
import { DocumentData } from '../types/firestore'
import { firebaseDocSnapshotFromPath } from './firebase-doc-snapshot-from-path'
import { isNil } from 'rambda'

export function firebaseDoc<T extends DocumentData>(path: FirebaseDocument, segment: string): Promise<T> {
  return firebaseDocSnapshotFromPath<T>(path, segment).then((doc) => {
    if (isNil(doc)) {
      throw new FirebaseDocumentNotError(path)
    }
    return doc.data() as T
  })
}
