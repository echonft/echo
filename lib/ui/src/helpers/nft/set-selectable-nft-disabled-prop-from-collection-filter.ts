import { disable } from '@echo/ui/helpers/disableable/disable'
import { getSelection } from '@echo/ui/helpers/selection/get-selection'
import type { CollectionFilter } from '@echo/ui/types/collection-filter'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { isIn } from '@echo/utils/fp/is-in'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { isEmpty, isNil, map, path, pipe, prop, unless } from 'ramda'

function internalFn(collectionFilters: CollectionFilter[]) {
  return function (nft: SelectableNft) {
    const selectedFilters = getSelection(collectionFilters)
    if (isEmpty(selectedFilters)) {
      return nft
    }
    const selectedFiltersIds = map(prop('id'), selectedFilters)
    return unless(
      pipe<[SelectableNft], string, boolean>(nonNullableReturn(path(['collection', 'id'])), isIn(selectedFiltersIds)),
      disable
    )(nft)
  }
}

export function setSelectableNftDisabledPropFromCollectionFilter(
  collectionFilters: CollectionFilter[]
): (nft: SelectableNft) => SelectableNft
export function setSelectableNftDisabledPropFromCollectionFilter(
  collectionFilters: CollectionFilter[],
  nft: SelectableNft
): SelectableNft
export function setSelectableNftDisabledPropFromCollectionFilter(
  collectionFilters: CollectionFilter[],
  nft?: SelectableNft
): ((nft: SelectableNft) => SelectableNft) | SelectableNft {
  if (isNil(nft)) {
    return internalFn(collectionFilters)
  }
  return internalFn(collectionFilters)(nft)
}
