import { getApiBaseUrl } from './get-api-base-url'

export const getNftCollectionListingsUrl = (id: string) => new URL(`${getApiBaseUrl()}/collection/${id}/listings`)
