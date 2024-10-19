import { collectionArrayIndex } from '@echo/firestore/array-indexers/collection/collection-array-index'
import type { ArrayIndex } from '@echo/firestore/types/array-index'
import type { NftItem } from '@echo/model/types/item/nft-item'
import { path, pipe } from 'ramda'

export function itemCollectionArrayIndex(item: NftItem): ArrayIndex {
  return pipe(path<NftItem, 'token', 'collection'>(['token', 'collection']), collectionArrayIndex)(item)
}
