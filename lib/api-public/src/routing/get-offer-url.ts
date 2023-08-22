import { getApiBaseUrl } from './get-api-base-url'

export const getOfferUrl = (id: string) => new URL(`${getApiBaseUrl()}/offer/${id}`)
