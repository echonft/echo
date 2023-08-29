import { apiBaseUrl } from './api-base-url'

export function nftCollectionApiUrl(slug: string) {
  return new URL(`${apiBaseUrl()}/collection/${slug}`)
}
