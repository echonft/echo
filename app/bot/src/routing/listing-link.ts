import { collectionListingsLink } from './collection-listings-link'

// FIXME listings actually are for both the items and the targets, so we need to figure out how to do that
// imo the could be accessible via /listings/{listingId}, {items_collection}/listings/{listingId}, and [target_collection]/listings/{listingId}
export function listingLink(listingId: string, discordGuildId: string): string {
  return `${collectionListingsLink(discordGuildId)}/${listingId}`
}
