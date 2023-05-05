import { collectionLink } from './collection-link'
import { getBaseUrl } from './get-base-url'

export function loginLink(guildId: string) {
  const callbackQuery = new URLSearchParams({ callbackUrl: collectionLink(guildId) })
  return `${getBaseUrl()}/login?${callbackQuery.toString()}`
}
