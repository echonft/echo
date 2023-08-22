import { getBaseUrl } from './get-base-url'
import { Offer } from '@echo/firestore'

export function offerLink(offer: Offer): string {
  return encodeURI(`${getBaseUrl()}/${offer.id}`)
}
