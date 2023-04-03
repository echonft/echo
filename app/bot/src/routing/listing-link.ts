import { getServerConfig } from '@echo/api'

/**
 * Creates a link to the listings page for a guild
 * @param guildId Id of the collection guild the command was sent from
 */
export function listingsLink(guildId: string) {
  return encodeURI(`${getServerConfig().url}/listings/${guildId}`)
}
