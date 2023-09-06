import { apiBaseUrl } from './api-base-url'

export function allNftCollectionsApiUrl() {
  return new URL(`${apiBaseUrl()}/collections`)
}
