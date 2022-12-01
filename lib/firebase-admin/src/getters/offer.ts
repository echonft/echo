import { document } from './document'
import { FirebaseDocument, mapOffer } from '@echo/firebase'
import { Offer } from '@echo/model'

/**
 * Get offer with id
 * @param id The offer id
 */
export function offer(id: string): Promise<Offer> {
  return document(id, FirebaseDocument.OFFERS, mapOffer)
}
