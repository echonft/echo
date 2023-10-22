// FIXME listings actually are for both the items and the targets, so we need to figure out how to do that
// imo the could be accessible via /listings/{listingId}, {items_collection}/listings/{listingId}, and [target_collection]/listings/{listingId}
import { getAppUrl } from '@echo/bot/routing/get-app-url'
import { links } from '@echo/ui/constants/links'

// FIXME we need to review this
export function listingLink(username: string) {
  return `${getAppUrl()}${links.user.listings(username)}`
}
