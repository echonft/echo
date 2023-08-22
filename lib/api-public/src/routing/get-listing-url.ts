import { getApiBaseUrl } from './get-api-base-url'

export const getListingUrl = (id: string) => `${getApiBaseUrl()}listing/${id}`
