import { getApiUrl } from '@echo/api'
import { Offer } from '@echo/model'

export function linkForListing(listing: Offer): string {
  return `${getApiUrl()}/${listing.discordGuild.discordId}/${listing.id}`
}
