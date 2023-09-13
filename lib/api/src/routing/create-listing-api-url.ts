import { apiBaseUrl } from '@echo/api/routing/api-base-url'

export function createListingApiUrl() {
  return new URL(`${apiBaseUrl()}/listing`)
}
