import type { NftIndex } from '@echo/model/types/nft'

export function nftQueryParam(nft: NftIndex): string {
  return `${nft.collection.slug}.${nft.tokenId}`
}
