import { apiBaseUrl } from './api-base-url'

export function userNonceApiUrl() {
  return new URL(`${apiBaseUrl()}/user/nonce`)
}
