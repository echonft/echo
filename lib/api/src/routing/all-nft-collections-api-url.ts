import { apiBaseUrl } from '@echo-api/routing/api-base-url'

export function allNftCollectionsApiUrl() {
  return new URL(`${apiBaseUrl()}/collections`)
}
