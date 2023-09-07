import { apiBaseUrl } from './api-base-url'
import { isEmpty } from 'ramda'

<<<<<<<< HEAD:lib/api/src/routing/collection-swaps-api-url.ts
export function collectionSwapsApiUrl(slug: string) {
========
export function collectionApiUrl(slug: string) {
>>>>>>>> 586a9717 (added listings to nft details page):lib/api/src/routing/collection-api-url.ts
  if (isEmpty(slug)) {
    throw Error('collection slug is required')
  }
  return new URL(`${apiBaseUrl()}/collection/${slug}/swaps`)
}
