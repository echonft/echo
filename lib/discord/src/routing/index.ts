import { discordConfig } from '../config'
import { getEchoLink, Routes } from '../types'

export const loginLink: string = encodeURI(
  `https://discord.com/api/oauth2/authorize?client_id=${discordConfig.clientId}&redirect_uri=${discordConfig.redirectUri}&response_type=code&scope=identify`
)

/**
 * Creates a link to the offer creation page on website
 * @param collectionId Id of the collection the command was sent from
 */
export function createOfferLink(collectionId: string) {
  return encodeURI(`${getEchoLink()}${Routes.CREATE_OFFER}/${collectionId}`)
}
