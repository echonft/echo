import { documentSnapshot } from './document-snapshot'
import { FirestoreOffer, FirestorePath } from '@echo/firebase'

/**
 * Get offer document snapshot with id
 * @param id The offer id
 */
export function offerSnapshot(id: string) {
  return documentSnapshot<FirestoreOffer>(id, FirebaseDocument.OFFERS)
}
