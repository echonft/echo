import { apiBaseUrl } from './api-base-url'

export function allNftCollectionApiUrl() {
  return new URL(`${apiBaseUrl()}/collection/all`)
}
