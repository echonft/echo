import { DiscordRoutes } from './discord-routes'
import { getApiUrl } from '@echo/api/dist/config'

/**
 * Creates a link to the offer creation page on website
 * @param collectionId Id of the collection the command was sent from
 */
export function createOfferLink(collectionId: string) {
  return encodeURI(`${getApiUrl()}${DiscordRoutes.CREATE_OFFER}/${collectionId}`)
}
