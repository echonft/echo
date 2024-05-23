import { collectionComparator } from '@echo/model/helpers/collection/collection-comparator'
import { type Collection } from '@echo/model/types/collection'
import { type Nft } from '@echo/model/types/nft'
import { type CollectionFilter } from '@echo/ui/types/collection-filter'
import { collectBy, head, length, map, pipe, prop, sort } from 'ramda'

export function getCollectionFiltersForNfts(nfts: Nft[]): CollectionFilter[] {
  return pipe(
    map<Nft, Collection>(prop('collection')),
    sort(collectionComparator),
    collectBy(prop('slug')),
    map((collections: Collection[]): CollectionFilter => {
      const collection = head(collections)!
      return {
        id: collection.slug,
        label: collection.name,
        collection,
        count: length(collections)
      }
    })
  )(nfts)
}
