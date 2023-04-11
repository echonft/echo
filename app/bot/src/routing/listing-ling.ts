import { collectionListingsLink } from './collection-listings-link'
import { Offer } from '@echo/model'

export function listingLink(listing: Offer): string {
  return `${collectionListingsLink(listing.discordGuild.discordId)}/${listing.id}`
}
