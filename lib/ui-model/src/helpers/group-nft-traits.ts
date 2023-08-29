import { NftTraits } from '../types/nft-traits'
import { TraitFilterGroup } from '../types/trait-filter'
import { forEachObjIndexed } from 'ramda'

export function groupNftTraits(traits: NftTraits): TraitFilterGroup[] {
  const traitFilterGroups = new Array<TraitFilterGroup>()
  forEachObjIndexed((values, trait) => {
    traitFilterGroups.push({ trait, values } as TraitFilterGroup)
  }, traits)
  return traitFilterGroups
}
