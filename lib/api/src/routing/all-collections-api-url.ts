import { apiBaseUrl } from '@echo/api/routing/api-base-url'

export function allCollectionsApiUrl() {
  return new URL(`${apiBaseUrl()}/collections`)
}
