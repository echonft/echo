import { documentSnapshot } from './document-snapshot'
import { FirebaseDocument } from '@echo/firebase'
export function userSnapshot(id: string) {
  return documentSnapshot(id, FirebaseDocument.USERS)
}
