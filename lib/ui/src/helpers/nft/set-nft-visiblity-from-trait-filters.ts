import type { NftAttribute } from '@echo/model/types/nft-attribute'
import { getSelectionInList } from '@echo/ui/helpers/selectable/get-selection-in-list'
import { hide } from '@echo/ui/helpers/visibility/hide'
import { show } from '@echo/ui/helpers/visibility/show'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import type { TraitFilter } from '@echo/ui/types/trait-filter'
import { intersects } from '@echo/utils/fp/intersects'
import { ifElse, isEmpty, isNil, map, pick, pipe, prop } from 'ramda'

function internalFn(filters: TraitFilter[]) {
  return function (nft: SelectableNft) {
    const selectedFilters = getSelectionInList(filters)
    if (isEmpty(selectedFilters)) {
      return nft
    }
    const attributes = map(pick(['trait', 'value']), selectedFilters)
    return ifElse(
      pipe<[SelectableNft], NftAttribute[], boolean>(prop('attributes'), intersects(attributes)),
      show,
      hide
    )(nft)
  }
}

export function setNftVisiblityFromTraitFilters(filters: TraitFilter[], nft: SelectableNft): SelectableNft
export function setNftVisiblityFromTraitFilters(filters: TraitFilter[]): (nft: SelectableNft) => SelectableNft
export function setNftVisiblityFromTraitFilters(
  filters: TraitFilter[],
  nft?: SelectableNft
): ((nft: SelectableNft) => SelectableNft) | SelectableNft {
  if (isNil(nft)) {
    return internalFn(filters)
  }
  return internalFn(filters)(nft)
}
