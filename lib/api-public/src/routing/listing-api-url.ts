import { apiBaseUrl } from './api-base-url'

export function listingApiUrl(id: string) {
  return new URL(`${apiBaseUrl()}/listing/${id}`)
}
