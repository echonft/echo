import { FirebaseDocumentError } from '../errors/document-error'
import { firestore } from '../services/firestore'
import { convertAdminDocumentSnapshot } from '../utils/document-snapshot'
import { FirebaseDocument } from '@echo/firebase/paths/document-path'
import { DocumentSnapshot } from 'firebase/firestore'

export function getDocumentSnapshot(id: string, collection: FirebaseDocument) {
  return firestore().collection(collection).doc(id).get()
}

export function getDocument<T, U = T>(
  id: string,
  collection: FirebaseDocument,
  mapper?: (snapshot: DocumentSnapshot<T>) => Promise<U>
): Promise<U> {
  return getDocumentSnapshot(id, collection).then((snapshot) => {
    if (!snapshot.exists) {
      throw new FirebaseDocumentError(id, collection)
    }
    if (!mapper) {
      return Promise.resolve(snapshot.data() as U)
    }
    return mapper(convertAdminDocumentSnapshot<T>(snapshot))
  })
}
