import { Routes } from '../types'
import { getApiUrl } from '@echo/api'

/**
 * Creates a link to the offer creation page on website
 * @param collectionId Id of the collection the command was sent from
 */
export function createOfferLink(collectionId: string) {
  return encodeURI(`${getApiUrl()}${Routes.CREATE_OFFER}/${collectionId}`)
}
