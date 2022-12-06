import { Routes } from '../types'
import { getEchoLink } from './get-echo-link'

/**
 * Creates a link to the offer creation page on website
 * @param collectionId Id of the collection the command was sent from
 */
export function createOfferLink(collectionId: string) {
  return encodeURI(`${getEchoLink()}${Routes.CREATE_OFFER}/${collectionId}`)
}
