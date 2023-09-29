import { apiBaseUrl } from '@echo/api/routing/api-base-url'

export function allSwapsApiUrl() {
  return new URL(`${apiBaseUrl()}/swaps`)
}
