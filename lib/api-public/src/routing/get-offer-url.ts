import { getApiBaseUrl } from './get-api-base-url'

export const getOfferUrl = (id: string) => `${getApiBaseUrl()}offer/${id}`
