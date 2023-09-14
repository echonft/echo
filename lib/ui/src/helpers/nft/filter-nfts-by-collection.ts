import type { CollectionFilter } from '@echo/ui/types/collection-filter'
import type { Nft } from '@echo/ui/types/model/nft'
import { isIn } from '@echo/utils/fp/is-in'
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
