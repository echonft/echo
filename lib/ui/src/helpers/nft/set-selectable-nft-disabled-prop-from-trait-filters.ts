import type { NftAttribute } from '@echo/model/types/nft-attribute'
import { disable } from '@echo/ui/helpers/disableable/disable'
import { getSelection } from '@echo/ui/helpers/selection/get-selection'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import type { TraitFilter } from '@echo/ui/types/trait-filter'
import { intersects } from '@echo/utils/fp/intersects'
import { isEmpty, isNil, map, pick, pipe, prop, unless } from 'ramda'

function internalFn(filters: TraitFilter[]) {
  return function (nft: SelectableNft) {
    const selectedFilters = getSelection(filters)
    if (isEmpty(selectedFilters)) {
      return nft
    }
    const attributes = map(pick(['trait', 'value']), selectedFilters)
    return unless(
      pipe<[SelectableNft], NftAttribute[], boolean>(prop('attributes'), intersects(attributes)),
      disable
    )(nft)
  }
}

export function setSelectableNftDisabledPropFromTraitFilters(filters: TraitFilter[], nft: SelectableNft): SelectableNft
export function setSelectableNftDisabledPropFromTraitFilters(
  filters: TraitFilter[]
): (nft: SelectableNft) => SelectableNft
export function setSelectableNftDisabledPropFromTraitFilters(
  filters: TraitFilter[],
  nft?: SelectableNft
): ((nft: SelectableNft) => SelectableNft) | SelectableNft {
  if (isNil(nft)) {
    return internalFn(filters)
  }
  return internalFn(filters)(nft)
}
