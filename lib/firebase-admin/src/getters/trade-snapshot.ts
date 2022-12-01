import { FirebaseDocument } from '@echo/firebase'
import { documentSnapshot } from './document-snapshot'

/**
 * Get trade document snapshot with id
 * @param id The offer id
 */
export function tradeSnapshot(id: string) {
  return documentSnapshot(id, FirebaseDocument.TRADES)
}
