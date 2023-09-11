import { apiBaseUrl } from './api-base-url'

export function profileOffersApiUrl() {
  return new URL(`${apiBaseUrl()}/profile/offers`)
}
