import { apiBaseUrl } from '@echo-api/routing/api-base-url'

export function profileNonceApiUrl() {
  return new URL(`${apiBaseUrl()}/profile/nonce`)
}
