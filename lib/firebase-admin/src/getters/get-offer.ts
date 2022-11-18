import { getDocument } from '../utils/document'
import { mapOffer } from '@echo/firebase/mappers/offer'
import { FirebaseDocument } from '@echo/firebase/paths/document-path'
import { Offer } from '@echo/model/offer'

/**
 * Get offer with id
 * @param id The offer id
 */
export function getOffer(id: string): Promise<Offer> {
  return getDocument(id, FirebaseDocument.OFFERS, mapOffer)
}
