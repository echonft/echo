import { getServerConfig } from '../../config/get-server-config'

/**
 * Creates a link to the listing creation page on website
 * @param guildId Id of the collection guild the command was sent from
 */
export function createListingLink(guildId: string) {
  return encodeURI(`${getServerConfig().url}/listings/${guildId}/create`)
}
