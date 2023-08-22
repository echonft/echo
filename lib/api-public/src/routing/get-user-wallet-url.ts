import { getApiBaseUrl } from './get-api-base-url'

export const getUserWalletUrl = () => new URL(`${getApiBaseUrl()}/user/wallet`)
