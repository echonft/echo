import type { NftTraits } from '@echo/ui/types/model/nft-traits'
import type { TraitFilterGroup } from '@echo/ui/types/trait-filter-group'
import { forEachObjIndexed } from 'ramda'

export function groupNftTraits(traits: NftTraits): TraitFilterGroup[] {
  const traitFilterGroups = new Array<TraitFilterGroup>()
  forEachObjIndexed((values, trait) => {
    traitFilterGroups.push({ trait, values } as TraitFilterGroup)
  }, traits)
  return traitFilterGroups
}
