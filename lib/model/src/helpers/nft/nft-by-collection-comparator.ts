import { collectionByNameComparator } from '@echo/model/helpers/collection/collection-by-name-comparator'
import type { NftCollection } from '@echo/model/types/nft'

export function nftByCollectionComparator<T extends Record<'collection', Pick<NftCollection, 'name'>>>(
  nftA: T,
  nftB: T
) {
  return collectionByNameComparator(nftA.collection, nftB.collection)
}
