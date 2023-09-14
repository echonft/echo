import { apiBaseUrl } from '@echo/api/routing/api-base-url'

export function profileWalletApiUrl() {
  return new URL(`${apiBaseUrl()}/profile/wallet`)
}
