import { document } from './document'
import { FirebaseDocumentName, FirestoreOffer, mapOffer } from '@echo/firebase'
import { Offer } from '@echo/model'

/**
 * Get offer with id
 * @param id The offer id
 */
export function offer(id: string): Promise<Offer> {
  return document<FirestoreOffer, Offer>(id, FirebaseDocument.OFFERS, mapOffer)
}
