import { documentSnapshot } from './document-snapshot'
import { FirebaseDocumentName, FirestoreOffer } from '@echo/firebase'

/**
 * Get offer document snapshot with id
 * @param id The offer id
 */
export function offerSnapshot(id: string) {
  return documentSnapshot<FirestoreOffer>(id, FirebaseDocument.OFFERS)
}
