import { collectionLink } from '@echo/bot/routing/collection-link'
import { getAppUrl } from '@echo/bot/routing/get-app-url'

export function loginLink(guildId: string) {
  const callbackQuery = new URLSearchParams({ callbackUrl: collectionLink(guildId) })
  return `${getAppUrl()}/login?${callbackQuery.toString()}`
}
