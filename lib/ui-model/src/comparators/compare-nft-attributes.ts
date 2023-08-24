import { NftAttribute } from '../types/nft-attribute'

export function compareNftAttributes(attributeA: NftAttribute, attributeB: NftAttribute) {
  const traitDiff = attributeA.trait.localeCompare(attributeB.trait)
  if (traitDiff === 0) {
    return attributeA.value.localeCompare(attributeB.value)
  }
  return traitDiff
}
