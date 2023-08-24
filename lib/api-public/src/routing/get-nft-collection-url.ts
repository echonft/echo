import { getApiBaseUrl } from './get-api-base-url'

export const getNftCollectionUrl = (id: string) => new URL(`${getApiBaseUrl()}/collection/${id}`)
