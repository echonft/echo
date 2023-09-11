import { apiBaseUrl } from '@echo-api/routing/api-base-url'
import { isEmpty } from 'ramda'

export function nftApiUrl(collectionSlug: string, tokenId: string) {
  if (isEmpty(collectionSlug)) {
    throw Error('collection slug is required')
  }
  if (isEmpty(tokenId)) {
    throw Error('token id is required')
  }
  return new URL(`${apiBaseUrl()}/collection/${collectionSlug}/item/${tokenId}`)
}
