import { apiBaseUrl } from './api-base-url'

export function userWalletApiUrl() {
  return new URL(`${apiBaseUrl()}/user/me/wallet`)
}
