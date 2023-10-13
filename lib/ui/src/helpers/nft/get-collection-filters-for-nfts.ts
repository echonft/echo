import type { Collection } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'
import { collectionEquals } from '@echo/ui/comparators/collection-equals'
import type { CollectionFilter } from '@echo/ui/types/collection-filter'
import { applySpec, eqProps, groupWith, head, length, map, pipe, prop, sort } from 'ramda'

export function getCollectionFiltersForNfts(nfts: Nft[]): CollectionFilter[] {
  return pipe(
    sort(collectionEquals),
    map(prop('collection')),
    groupWith(eqProps('id')),
    map(
      applySpec<CollectionFilter>({
        id: pipe(head<Collection, Collection>, prop('id')),
        name: pipe(head<Collection, Collection>, prop('name')),
        count: length
      })
    )
  )(nfts)
}
