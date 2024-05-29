import { collectionByNameComparator } from '@echo/model/helpers/collection/collection-by-name-comparator'
import { type Collection } from '@echo/model/types/collection'
import { type Nft } from '@echo/model/types/nft'
import { type CollectionFilter } from '@echo/ui/types/collection-filter'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { applySpec, collectBy, head, length, map, pipe, prop, sort } from 'ramda'

export function getCollectionFiltersForNfts<T extends Nft>(nfts: T[]): CollectionFilter[] {
  return pipe<[T[]], Collection[], Collection[], Collection[][], CollectionFilter[]>(
    map<T, Collection>(prop('collection')),
    sort(collectionByNameComparator),
    collectBy(prop('slug')),
    map<Collection[], CollectionFilter>(
      applySpec<CollectionFilter>({
        id: pipe(nonNullableReturn(head<Collection>), prop('slug')),
        label: pipe(nonNullableReturn(head<Collection>), prop('name')),
        count: length
      })
    )
  )(nfts)
}
