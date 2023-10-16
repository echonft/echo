import type { Nft } from '@echo/model/types/nft'
import { disable } from '@echo/ui/helpers/disableable/disable'
import { getSelection } from '@echo/ui/helpers/selection/get-selection'
import { DisableableType } from '@echo/ui/types/disableable'
import { TraitFilter } from '@echo/ui/types/trait-filter'
import { intersects } from '@echo/utils/fp/intersects'
import { isEmpty, isNil, map, pick, pipe, prop, unless } from 'ramda'

function internalFn(filters: TraitFilter[]): (nft: DisableableType<Nft>) => DisableableType<Nft> {
  return function (nft: DisableableType<Nft>) {
    const selectedFilters = getSelection(filters)
    if (isEmpty(selectedFilters)) {
      return nft
    }
    const attributes = map(pick(['trait', 'value']), selectedFilters)
    return unless(pipe(prop('attributes'), intersects(attributes)), disable)(nft) as DisableableType<Nft>
  }
}

export function setNftDisabledPropFromTraitFilters(
  filters: TraitFilter[],
  nft: DisableableType<Nft>
): DisableableType<Nft>
export function setNftDisabledPropFromTraitFilters(
  filters: TraitFilter[]
): (nft: DisableableType<Nft>) => DisableableType<Nft>
export function setNftDisabledPropFromTraitFilters(
  filters: TraitFilter[],
  nft?: DisableableType<Nft>
): ((nft: DisableableType<Nft>) => DisableableType<Nft>) | DisableableType<Nft> {
  if (isNil(nft)) {
    return internalFn(filters)
  }
  return internalFn(filters)(nft)
}
