import { itemsCollectionArrayIndexer } from '@echo/firestore/array-indexers/item/items-collection-array-indexer'
import { nftItems } from '@echo/model/helpers/item/nft-items'
import type { Offer } from '@echo/model/types/offer/offer'
import { assoc, has, pipe, prop, uniq } from 'ramda'

export function addReceiverItemsCollectionSlug(modelObject: Partial<Offer>): Partial<Offer> {
  if (has('receiverItems', modelObject)) {
    return assoc(
      'receiverItemCollections',
      pipe(prop('receiverItems'), nftItems, itemsCollectionArrayIndexer, uniq)(modelObject),
      modelObject
    )
  }
  return modelObject
}
