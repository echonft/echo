import { type NftAttribute } from '@echo/model/types/nft-attribute'

export function compareNftAttributes(attributeA: NftAttribute, attributeB: NftAttribute): number {
  return attributeA.trait.localeCompare(attributeB.trait)
}
