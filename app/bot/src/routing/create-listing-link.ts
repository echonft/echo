import { collectionListingsLink } from './collection-listings-link'

/**
 * Creates a link to the listing creation page on website
 * @param guildId Id of the collection guild the command was sent from
 */
export function createListingLink(guildId: string) {
  return encodeURI(`${collectionListingsLink(guildId)}/create`)
}
