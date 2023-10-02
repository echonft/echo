import { disable } from '@echo/ui/helpers/disableable/disable'
import { getSelection } from '@echo/ui/helpers/selection/get-selection'
import { DisableableType } from '@echo/ui/types/disableable'
import type { Nft } from '@echo/ui/types/model/nft'
import { TraitFilter } from '@echo/ui/types/trait-filter'
import { intersects } from '@echo/utils/fp/intersects'
import { isEmpty, isNil, map, pick, pipe, prop, unless } from 'ramda'

function internalFn(filters: TraitFilter[]): (nfts: DisableableType<Nft>[]) => DisableableType<Nft>[] {
  return function (nfts: DisableableType<Nft>[]) {
    const selectedFilters = getSelection(filters)
    if (isEmpty(selectedFilters)) {
      return nfts
    }
    const attributes = map(pick(['trait', 'value']), selectedFilters)
    return map(unless(pipe(prop('attributes'), intersects(attributes)), disable), nfts) as DisableableType<Nft>[]
  }
}

export function setNftsDisabledPropFromTraitFilters(
  filters: TraitFilter[],
  nfts: DisableableType<Nft>[]
): DisableableType<Nft>[]
export function setNftsDisabledPropFromTraitFilters(
  filters: TraitFilter[]
): (nfts: DisableableType<Nft>[]) => DisableableType<Nft>[]
export function setNftsDisabledPropFromTraitFilters(
  filters: TraitFilter[],
  nfts?: DisableableType<Nft>[]
): ((nfts: DisableableType<Nft>[]) => DisableableType<Nft>[]) | DisableableType<Nft>[] {
  if (isNil(nfts)) {
    return internalFn(filters)
  }
  return internalFn(filters)(nfts)
}
