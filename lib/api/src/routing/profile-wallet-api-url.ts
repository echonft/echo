import { apiBaseUrl } from './api-base-url'

export function profileWalletApiUrl() {
  return new URL(`${apiBaseUrl()}/profile/wallet`)
}
