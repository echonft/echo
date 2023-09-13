import { apiBaseUrl } from '@echo/api/routing/api-base-url'

export function profileOffersApiUrl() {
  return new URL(`${apiBaseUrl()}/profile/offers`)
}
