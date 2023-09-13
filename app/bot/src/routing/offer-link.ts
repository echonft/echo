import { getBaseUrl } from './get-base-url'
import { FirestoreOffer } from '@echo/firestore/types/model/firestore-offer'

export function offerLink(offer: FirestoreOffer): string {
  return encodeURI(`${getBaseUrl()}/offers/${offer.id}`)
}
