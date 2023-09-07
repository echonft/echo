import { apiBaseUrl } from './api-base-url'
import { isEmpty } from 'ramda'

<<<<<<<< HEAD:lib/api/src/routing/collection-api-url.ts
export function collectionApiUrl(slug: string) {
  if (isEmpty(slug)) {
    throw Error('collection slug is required')
  }
  return new URL(`${apiBaseUrl()}/collection/${slug}`)
========
export function nftCollectionSwapsApiUrl(slug: string) {
  if (isEmpty(slug)) {
    throw Error('collection slug is required')
  }
  return new URL(`${apiBaseUrl()}/collection/${slug}/swaps`)
>>>>>>>> 5eb79b8f (added collection swaps):lib/api/src/routing/nft-collection-swaps-api-url.ts
}
