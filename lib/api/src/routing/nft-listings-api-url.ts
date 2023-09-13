import { apiBaseUrl } from '@echo/api/routing/api-base-url'
import { isEmpty } from 'ramda'

export function nftListingsApiUrl(nftId: string) {
  if (isEmpty(nftId)) {
    throw Error('nft id is required')
  }
  return new URL(`${apiBaseUrl()}/nft/${nftId}/listings`)
}
