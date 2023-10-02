import { disable } from '@echo/ui/helpers/disableable/disable'
import { getSelection } from '@echo/ui/helpers/selection/get-selection'
import type { CollectionFilter } from '@echo/ui/types/collection-filter'
import { DisableableType } from '@echo/ui/types/disableable'
import type { Nft } from '@echo/ui/types/model/nft'
import { isIn } from '@echo/utils/fp/is-in'
import { isEmpty, isNil, map, path, pipe, prop, unless } from 'ramda'

function internalFn(collectionFilters: CollectionFilter[]): (nfts: DisableableType<Nft>[]) => DisableableType<Nft>[] {
  return function (nfts: DisableableType<Nft>[]) {
    const selectedFilters = getSelection(collectionFilters)
    if (isEmpty(selectedFilters)) {
      return nfts
    }
    const selectedFiltersIds = map(prop('id'), collectionFilters)
    return map(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      unless(pipe(path(['collection', 'id']), isIn(selectedFiltersIds)), disable),
      nfts
    ) as DisableableType<Nft>[]
  }
}

export function setNftsDisabledPropFromCollectionFilter(
  collectionFilters: CollectionFilter[]
): (nfts: DisableableType<Nft>[]) => DisableableType<Nft>[]
export function setNftsDisabledPropFromCollectionFilter(
  collectionFilters: CollectionFilter[],
  nfts: DisableableType<Nft>[]
): DisableableType<Nft>[]
export function setNftsDisabledPropFromCollectionFilter(
  collectionFilters: CollectionFilter[],
  nfts?: DisableableType<Nft>[]
): ((nfts: DisableableType<Nft>[]) => DisableableType<Nft>[]) | DisableableType<Nft>[] {
  if (isNil(nfts)) {
    return internalFn(collectionFilters)
  }
  return internalFn(collectionFilters)(nfts)
}
