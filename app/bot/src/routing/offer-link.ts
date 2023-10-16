import { getAppUrl } from '@echo/bot/routing/get-app-url'
import type { Offer } from '@echo/model/types/offer'

export function offerLink(offer: Offer): string {
  return encodeURI(`${getAppUrl()}/offers/${offer.id}`)
}
