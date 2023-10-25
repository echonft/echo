import { getAppUrl } from '@echo/bot/helpers/get-app-url'
import { type Offer } from '@echo/model/types/offer'
import { links } from '@echo/ui/constants/links'

export function offerLink(offer: Offer): string {
  return encodeURI(`${getAppUrl()}${links.profile.offer(offer.id)}`)
}
