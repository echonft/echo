import { collectionListingsLink } from './collection-listings-link'

export function listingLink(listingId: string, discordGuildId: string): string {
  return `${collectionListingsLink(discordGuildId)}/${listingId}`
}
