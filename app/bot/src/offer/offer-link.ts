import { getAppUrl } from '@echo/bot/helpers/get-app-url'
import { links } from '@echo/ui/constants/links'

export function offerLink(offerId: string): string {
  return encodeURI(`${getAppUrl()}${links.profile.offer(offerId)}`)
}
