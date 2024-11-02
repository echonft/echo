import type { NftAttribute } from '@echo/model/types/nft'

export function nftAttributeComparator(attributeA: NftAttribute, attributeB: NftAttribute): number {
  return attributeA.trait.localeCompare(attributeB.trait)
}
