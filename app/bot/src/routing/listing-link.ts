// FIXME listings actually are for both the items and the targets, so we need to figure out how to do that
// imo the could be accessible via /listings/{listingId}, {items_collection}/listings/{listingId}, and [target_collection]/listings/{listingId}
import { collectionListingsLink } from '@echo/bot/routing/collection-listings-link'

export function listingLink(listingId: string, discordGuildId: string): string {
  return `${collectionListingsLink(discordGuildId)}/${listingId}`
}
