import { collectionLink } from '@echo/bot/routing/collection-link'

/**
 * Creates a link to the listings page for a guild
 * @param guildId Id of the collection guild the command was sent from
 */
export function collectionListingsLink(guildId: string) {
  return encodeURI(`${collectionLink(guildId)}/listings`)
}
