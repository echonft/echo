import { apiBaseUrl } from './api-base-url'

export function profileNonceApiUrl() {
  return new URL(`${apiBaseUrl()}/profile/nonce`)
}
