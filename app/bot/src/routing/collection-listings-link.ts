import { getAppUrl } from '@echo/bot/routing/get-app-url'
import { links } from '@echo/ui/constants/links'

/**
 * Creates a link to the listings page for a guild
 * @param guildId Id of the collection guild the command was sent from
 * FIXME this is not gonna work because we need the collection slug
 */
export function collectionListingsLink(guildId: string) {
  return encodeURI(`${getAppUrl()}${links.collection.listings(guildId)}`)
}
