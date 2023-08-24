import { getApiBaseUrl } from './get-api-base-url'

export const getUserNonceUrl = () => new URL(`${getApiBaseUrl()}/user/nonce`)
