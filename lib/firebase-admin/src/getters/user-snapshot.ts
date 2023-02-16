import { documentSnapshot } from './document-snapshot'
import { FirestorePath, FirestoreUser } from '@echo/firebase'
export function userSnapshot(id: string) {
  return documentSnapshot<FirestoreUser>(id, FirebaseDocument.USERS)
}
