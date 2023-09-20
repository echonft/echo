import { getAppUrl } from '@echo/bot/routing/get-app-url'

export function collectionLink(collectionId: string) {
  return encodeURI(`${getAppUrl()}/collection/${collectionId}`)
}
