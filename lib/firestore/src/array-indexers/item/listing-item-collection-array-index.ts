import { collectionArrayIndex } from '@echo/firestore/array-indexers/collection/collection-array-index'
import type { ArrayIndex } from '@echo/firestore/types/array-index'
import type { Erc1155Item } from '@echo/model/types/item/erc1155-item'
import type { Erc721Item } from '@echo/model/types/item/erc721-item'
import { path, pipe } from 'ramda'

export function listingItemCollectionArrayIndex(item: Erc721Item | Erc1155Item): ArrayIndex {
  return pipe(
    path<Erc721Item | Erc1155Item, 'token', 'collection'>(['token', 'collection']),
    collectionArrayIndex
  )(item)
}
