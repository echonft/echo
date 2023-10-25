import { getAppUrl } from '@echo/bot/helpers/get-app-url'
import { links } from '@echo/ui/constants/links'

export function listingLink(collectionSlug: string, listingId: string) {
  return `${getAppUrl()}${links.collection.listing(collectionSlug, listingId)}`
}
