import { collectionLink } from './collection-link'
import { getServerConfig } from '@echo/api'

export function loginLink(guildId: string) {
  const callbackQuery = new URLSearchParams({ callbackUrl: collectionLink(guildId) })
  return `${getServerConfig().url}/login?${callbackQuery.toString()}`
}
