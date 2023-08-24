import { getApiBaseUrl } from './get-api-base-url'

export const getListingUrl = (id: string) => new URL(`${getApiBaseUrl()}/listing/${id}`)
