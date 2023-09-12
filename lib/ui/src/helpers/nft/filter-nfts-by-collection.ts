import { CollectionFilter } from '../../types/collection-filter'
import { Nft } from '@echo/ui-model'
import isIn from '@echo/utils/is-in'
import { filter, isEmpty, map, path, pipe, prop } from 'ramda'

export function filterNftsByCollection(nfts: Nft[], collectionFilters: CollectionFilter[]) {
  if (isEmpty(collectionFilters)) {
    return nfts
  }

  const collectionFiltersIds = map(prop('id'), collectionFilters)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return filter(pipe(path(['collection', 'id']), isIn(collectionFiltersIds)), nfts)
}
