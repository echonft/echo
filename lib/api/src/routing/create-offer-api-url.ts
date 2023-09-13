import { apiBaseUrl } from '@echo/api/routing/api-base-url'

export function createOfferApiUrl() {
  return new URL(`${apiBaseUrl()}/offer`)
}
