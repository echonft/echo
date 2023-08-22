import { getApiBaseUrl } from './get-api-base-url'

export const getNftCollectionUrl = (id: string) => `${getApiBaseUrl()}collection/${id}`
