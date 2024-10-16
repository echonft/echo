import { collectionByNameComparator } from '@echo/model/helpers/collection/collection-by-name-comparator'
import { type Nft, type NftCollection } from '@echo/model/types/nft/nft'
import { type CollectionFilter } from '@echo/ui/types/collection-filter'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { applySpec, collectBy, head, length, map, pipe, prop, sort } from 'ramda'

export function getCollectionFiltersForNfts(nfts: Nft[]): CollectionFilter[] {
  return pipe<[Nft[]], NftCollection[], NftCollection[], NftCollection[][], CollectionFilter[]>(
    map<Nft, NftCollection>(prop('collection')),
    sort(collectionByNameComparator),
    collectBy(prop('slug')),
    map<NftCollection[], CollectionFilter>(
      applySpec<CollectionFilter>({
        id: pipe(nonNullableReturn(head), prop('slug')),
        label: pipe(nonNullableReturn(head), prop('name')),
        count: length
      })
    )
  )(nfts)
}
