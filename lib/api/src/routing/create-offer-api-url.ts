import { apiBaseUrl } from './api-base-url'

export function createOfferApiUrl() {
  return new URL(`${apiBaseUrl()}/offer`)
}
