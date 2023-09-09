import { TraitFilterGroup } from '../../types/trait-filter-group'
import { NftTraits } from '@echo/ui-model'
import { forEachObjIndexed } from 'ramda'

export function groupNftTraits(traits: NftTraits): TraitFilterGroup[] {
  const traitFilterGroups = new Array<TraitFilterGroup>()
  forEachObjIndexed((values, trait) => {
    traitFilterGroups.push({ trait, values } as TraitFilterGroup)
  }, traits)
  return traitFilterGroups
}
