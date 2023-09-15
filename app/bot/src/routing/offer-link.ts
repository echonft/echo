import { getAppUrl } from '@echo/bot/routing/get-app-url'
import { FirestoreOffer } from '@echo/firestore/types/model/firestore-offer'

export function offerLink(offer: FirestoreOffer): string {
  return encodeURI(`${getAppUrl()}/offers/${offer.id}`)
}
