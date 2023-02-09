import { FirebaseDocumentError } from '../errors'
import { documentSnapshot } from './document-snapshot'
import { FirebaseDocumentName } from '@echo/firebase'
import { DocumentData, DocumentSnapshot } from '@google-cloud/firestore'

export function document<T extends DocumentData, U = T>(
  id: string,
  collection: FirebaseDocument,
  mapper?: (snapshot: DocumentSnapshot<T>) => Promise<U>
): Promise<U> {
  return documentSnapshot<T>(id, collection).then((snapshot) => {
    if (!snapshot.exists) {
      throw new FirebaseDocumentError(id, collection)
    }
    if (!mapper) {
      return Promise.resolve(snapshot.data() as U)
    }
    return mapper(snapshot)
  })
}
