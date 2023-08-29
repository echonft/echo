import { apiBaseUrl } from './api-base-url'

export function nftCollectionNftsApiUrl(slug: string) {
  return new URL(`${apiBaseUrl()}/collection/${slug}/nfts`)
}
