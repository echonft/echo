import { collectionListingsLink } from './collection-listings-link'
import { RequestForOffer } from '@echo/model'

export function listingLink(listing: RequestForOffer): string {
  return `${collectionListingsLink(listing.discordGuild.discordId)}/${listing.id}`
}
