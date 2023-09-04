import { getBaseUrl } from './get-base-url'
import { Offer } from '@echo/firestore-types'

export function offerLink(offer: Offer): string {
  return encodeURI(`${getBaseUrl()}/offers/${offer.id}`)
}
