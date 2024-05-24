import type { Nft } from '@echo/model/types/nft'

export function mapNftToQueryParam<T extends Nft>(nft: T): string {
  return `${nft.collection.slug}|${nft.tokenId}`
}
