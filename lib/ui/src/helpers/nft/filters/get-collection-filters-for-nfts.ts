import { collectionByNameComparator } from '@echo/model/helpers/collection/collection-by-name-comparator'
import { type Nft, type NftCollection } from '@echo/model/types/nft'
import type { Slug } from '@echo/model/types/slug'
import { type CollectionFilter } from '@echo/ui/types/collection-filter'
import { applySpec, collectBy, head, length, map, type NonEmptyArray, pipe, prop, sort } from 'ramda'

export function getCollectionFiltersForNfts(nfts: Nft[]): CollectionFilter[] {
  return pipe<[Nft[]], NftCollection[], NftCollection[], NftCollection[][], CollectionFilter[]>(
    map<Nft, NftCollection>(prop('collection')),
    sort(collectionByNameComparator),
    collectBy(prop('slug')),
    map<NftCollection[], CollectionFilter>(
      applySpec<CollectionFilter>({
        id: pipe<[NonEmptyArray<NftCollection>], NftCollection, Slug>(head, prop('slug')),
        label: pipe<[NonEmptyArray<NftCollection>], NftCollection, string>(head, prop('name')),
        count: length
      })
    )
  )(nfts)
}
