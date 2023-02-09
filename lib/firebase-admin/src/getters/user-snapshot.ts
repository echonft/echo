import { documentSnapshot } from './document-snapshot'
import { FirebaseDocumentName, FirestoreUser } from '@echo/firebase'
export function userSnapshot(id: string) {
  return documentSnapshot<FirestoreUser>(id, FirebaseDocument.USERS)
}
