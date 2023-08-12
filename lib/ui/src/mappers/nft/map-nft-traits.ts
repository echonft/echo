import { TraitFilterGroup } from '../../types/model/trait-filter'
import { NftTraits } from '../../types/nft-traits'
import { forEachObjIndexed } from 'ramda'

export const mapNftTraits = (traits: NftTraits): TraitFilterGroup[] => {
  const traitFilterGroups = new Array<TraitFilterGroup>()
  forEachObjIndexed((values, trait) => {
    traitFilterGroups.push({ trait, values } as TraitFilterGroup)
  }, traits)
  return traitFilterGroups
}
