import { getServerConfig } from '@echo/api'

export function collectionLink(guildId: string) {
  return encodeURI(`${getServerConfig().url}/collection/${guildId}`)
}
