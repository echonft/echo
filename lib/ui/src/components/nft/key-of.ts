import type { Nft } from '@echo/model/types/nft'

export function keyOf(nft: Nft): string {
  return `${nft.collection.slug}-${nft.tokenId}`
}
