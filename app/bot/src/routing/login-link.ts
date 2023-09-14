import { collectionLink } from '@echo/bot/routing/collection-link'
import { getBotBaseUrl } from '@echo/bot/routing/get-bot-base-url'

export function loginLink(guildId: string) {
  const callbackQuery = new URLSearchParams({ callbackUrl: collectionLink(guildId) })
  return `${getBotBaseUrl()}/login?${callbackQuery.toString()}`
}
