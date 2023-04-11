import { getServerConfig } from '@echo/api/dist/config/get-server-config'

export function collectionLink(guildId: string) {
  return encodeURI(`${getServerConfig().url}/collection/${guildId}`)
}
