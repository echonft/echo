import { getBaseUrl } from './get-base-url'

export function collectionLink(collectionId: string) {
  return encodeURI(`${getBaseUrl()}/collection/${collectionId}`)
}
