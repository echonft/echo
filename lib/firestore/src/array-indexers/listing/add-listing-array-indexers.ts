import { itemsCollectionArrayIndexer } from '@echo/firestore/array-indexers/item/items-collection-array-indexer'
import { itemsNftArrayIndexer } from '@echo/firestore/array-indexers/item/items-nft-array-indexer'
import type { ListingDocument } from '@echo/firestore/types/model/listing-document'
import { listingItems } from '@echo/model/helpers/listing/listing-items'
import { assoc, pipe, uniq } from 'ramda'

export function addListingArrayIndexers<T extends Partial<ListingDocument> & Required<Pick<ListingDocument, 'items'>>>(
  data: T
) {
  const itemCollections = pipe(listingItems, itemsCollectionArrayIndexer, uniq)(data)
  const itemIndexes = pipe(listingItems, itemsNftArrayIndexer)(data)
  return pipe(assoc('itemCollections', itemCollections), assoc('itemIndexes', itemIndexes))(data) as T &
    Pick<ListingDocument, 'itemIndexes' | 'itemCollections'>
}
