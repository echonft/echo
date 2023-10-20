import { type Nft } from '@echo/model/types/nft'
import { disable } from '@echo/ui/helpers/disableable/disable'
import { getSelection } from '@echo/ui/helpers/selection/get-selection'
import { type CollectionFilter } from '@echo/ui/types/collection-filter'
import { type DisableableType } from '@echo/ui/types/disableable'
import { isIn } from '@echo/utils/fp/is-in'
import { isEmpty, isNil, map, path, pipe, prop, unless } from 'ramda'

function internalFn(collectionFilters: CollectionFilter[]): (nft: DisableableType<Nft>) => DisableableType<Nft> {
  return function (nft: DisableableType<Nft>) {
    const selectedFilters = getSelection(collectionFilters)
    if (isEmpty(selectedFilters)) {
      return nft
    }
    const selectedFiltersIds = map(prop('id'), selectedFilters)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return unless(pipe(path(['collection', 'id']), isIn(selectedFiltersIds)), disable)(nft) as DisableableType<Nft>
  }
}

export function setNftDisabledPropFromCollectionFilter(
  collectionFilters: CollectionFilter[]
): (nft: DisableableType<Nft>) => DisableableType<Nft>
export function setNftDisabledPropFromCollectionFilter(
  collectionFilters: CollectionFilter[],
  nft: DisableableType<Nft>
): DisableableType<Nft>
export function setNftDisabledPropFromCollectionFilter(
  collectionFilters: CollectionFilter[],
  nft?: DisableableType<Nft>
): ((nft: DisableableType<Nft>) => DisableableType<Nft>) | DisableableType<Nft> {
  if (isNil(nft)) {
    return internalFn(collectionFilters)
  }
  return internalFn(collectionFilters)(nft)
}
