import { apiBaseUrl } from '@echo/api/routing/api-base-url'

export function allListingsApiUrl() {
  return new URL(`${apiBaseUrl()}/listings`)
}
