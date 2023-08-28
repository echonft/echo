import { getApiBaseUrl } from './get-api-base-url'

export const getUserOffersUrl = () => new URL(`${getApiBaseUrl()}/user/offers`)
