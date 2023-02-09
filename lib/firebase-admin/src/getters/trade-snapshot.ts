import { documentSnapshot } from './document-snapshot'
import { FirebaseDocumentName, FirestoreTrade } from '@echo/firebase'

/**
 * Get trade document snapshot with id
 * @param id The offer id
 */
export function tradeSnapshot(id: string) {
  return documentSnapshot<FirestoreTrade>(id, FirebaseDocument.TRADES)
}
