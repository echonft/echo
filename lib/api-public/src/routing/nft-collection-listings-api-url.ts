import { apiBaseUrl } from './api-base-url'

export function nftCollectionListingsApiUrl(id: string) {
  return new URL(`${apiBaseUrl()}/collection/${id}/listings`)
}
