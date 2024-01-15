import { type NftAttribute } from '@echo/model/types/nft-attribute'

export function nftAttributeEquals(attributeA: NftAttribute, attributeB: NftAttribute) {
  const traitDiff = attributeA.trait.localeCompare(attributeB.trait)
  if (traitDiff === 0) {
    return attributeA.value.localeCompare(attributeB.value)
  }
  return traitDiff
}
