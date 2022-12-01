import { FirebaseDocument } from '@echo/firebase'
import { documentSnapshot } from './document-snapshot'

/**
 * Get offer document snapshot with id
 * @param id The offer id
 */
export function offerSnapshot(id: string) {
  return documentSnapshot(id, FirebaseDocument.OFFERS)
}
