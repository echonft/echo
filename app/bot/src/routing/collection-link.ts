import { getBaseUrl } from './get-base-url'

export function collectionLink(guildId: string) {
  return encodeURI(`${getBaseUrl()}/collection/${guildId}`)
}
