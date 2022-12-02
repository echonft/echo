import { documentSnapshot } from './document-snapshot'
import { FirebaseDocument, FirebaseUser } from '@echo/firebase'
export function userSnapshot(id: string) {
  return documentSnapshot<FirebaseUser>(id, FirebaseDocument.USERS)
}
