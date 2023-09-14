import { getBotBaseUrl } from '@echo/bot/routing/get-bot-base-url'

export function collectionLink(collectionId: string) {
  return encodeURI(`${getBotBaseUrl()}/collection/${collectionId}`)
}
