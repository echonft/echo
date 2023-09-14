import { getBotBaseUrl } from '@echo/bot/routing/get-bot-base-url'
import { FirestoreOffer } from '@echo/firestore/types/model/firestore-offer'

export function offerLink(offer: FirestoreOffer): string {
  return encodeURI(`${getBotBaseUrl()}/offers/${offer.id}`)
}
