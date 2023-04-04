import { collectionLink } from './collection-link'
import { getServerConfig } from '@echo/api/dist/config/get-server-config'

export function loginLink(guildId: string) {
  const callbackQuery = new URLSearchParams({ callback: collectionLink(guildId) })
  return encodeURI(`${getServerConfig().url}/login?${callbackQuery.toString()}`)
}
