import { FirebaseDocumentError } from '../errors'
import { convertAdminDocumentSnapshot } from '../utils/convert-admin-document-snapshot'
import { documentSnapshot } from './document-snapshot'
import { FirebaseDocument } from '@echo/firebase'
import { DocumentSnapshot } from 'firebase/firestore'

export function document<T, U = T>(
  id: string,
  collection: FirebaseDocument,
  mapper?: (snapshot: DocumentSnapshot<T>) => Promise<U>
): Promise<U> {
  return documentSnapshot(id, collection).then((snapshot) => {
    if (!snapshot.exists) {
      throw new FirebaseDocumentError(id, collection)
    }
    if (!mapper) {
      return Promise.resolve(snapshot.data() as U)
    }
    return mapper(convertAdminDocumentSnapshot<T>(snapshot))
  })
}
