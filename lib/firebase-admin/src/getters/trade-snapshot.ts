import { documentSnapshot } from './document-snapshot'
import { FirebaseDocument, FirebaseTrade } from '@echo/firebase'

/**
 * Get trade document snapshot with id
 * @param id The offer id
 */
export function tradeSnapshot(id: string) {
  return documentSnapshot<FirebaseTrade>(id, FirebaseDocument.TRADES)
}
