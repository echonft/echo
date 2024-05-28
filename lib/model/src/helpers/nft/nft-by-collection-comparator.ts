import { collectionByNameComparator } from '@echo/model/helpers/collection/collection-by-name-comparator'
import type { Nft } from '@echo/model/types/nft'

export function nftByCollectionComparator<
  T extends Partial<Nft> &
    Required<{
      collection: Pick<Nft['collection'], 'name'>
    }>
>(nftA: T, nftB: T) {
  return collectionByNameComparator(nftA.collection, nftB.collection)
}
