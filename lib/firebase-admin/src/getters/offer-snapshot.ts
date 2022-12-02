import { documentSnapshot } from './document-snapshot'
import { FirebaseDocument, FirebaseOffer } from '@echo/firebase'

/**
 * Get offer document snapshot with id
 * @param id The offer id
 */
export function offerSnapshot(id: string) {
  return documentSnapshot<FirebaseOffer>(id, FirebaseDocument.OFFERS)
}
