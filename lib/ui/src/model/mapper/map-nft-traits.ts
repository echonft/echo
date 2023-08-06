import { TraitFilterGroup } from '../trait-filter'
import { NftTraits } from '@echo/model'
import { forEachObjIndexed } from 'ramda'

export const mapNftTraits = (traits: NftTraits): TraitFilterGroup[] => {
  const traitFilterGroups = new Array<TraitFilterGroup>()
  forEachObjIndexed((values, trait) => {
    traitFilterGroups.push({ trait, values } as TraitFilterGroup)
  }, traits)
  return traitFilterGroups
}
