import type { PartialNft } from '@echo/model/types/nft'

export function nftQueryParam(nft: PartialNft): string {
  return `${nft.collection.slug}.${nft.tokenId}`
}
