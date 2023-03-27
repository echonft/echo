import { getServerConfig } from '@echo/api'
import { Offer } from '@echo/model'

// TODO Move this
export function linkForListing(listing: Offer): string {
  return `${getServerConfig().url}/${listing.discordGuild.discordId}/${listing.id}`
}
