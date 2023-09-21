import { getAppUrl } from '@echo/bot/routing/get-app-url'
import { links } from '@echo/ui/constants/links'

export function loginLink(collectionSlug: string) {
  const callbackQuery = new URLSearchParams({ callbackUrl: `${getAppUrl()}${links.collection.items(collectionSlug)}` })
  return `${getAppUrl()}/login?${callbackQuery.toString()}`
}
