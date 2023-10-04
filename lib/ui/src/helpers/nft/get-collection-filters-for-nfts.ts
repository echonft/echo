import { nftCollectionEquals } from '@echo/ui/comparators/nft-collection-equals'
import type { CollectionFilter } from '@echo/ui/types/collection-filter'
import { Collection } from '@echo/ui/types/model/collection'
import type { Nft } from '@echo/ui/types/model/nft'
import { applySpec, eqProps, groupWith, head, length, map, pipe, prop, sort } from 'ramda'

export function getCollectionFiltersForNfts(nfts: Nft[]): CollectionFilter[] {
  return pipe(
    sort(nftCollectionEquals),
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
