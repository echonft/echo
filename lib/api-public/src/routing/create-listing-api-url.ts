import { apiBaseUrl } from './api-base-url'

export function createListingApiUrl() {
  return new URL(`${apiBaseUrl()}/create/listing`)
}
