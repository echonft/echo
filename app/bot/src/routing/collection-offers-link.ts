import { collectionLink } from './collection-link'

/**
 * Creates a link to the offers page for a guild
 * TODO Is there a page for all the offers???
 * @param guildId Id of the collection guild the command was sent from
 */
export function collectionOffersLink(guildId: string) {
  return encodeURI(`${collectionLink(guildId)}/offers`)
}
