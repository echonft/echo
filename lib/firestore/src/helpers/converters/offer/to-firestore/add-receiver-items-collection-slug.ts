import { itemsCollectionArrayIndexer } from '@echo/firestore/array-indexers/item/items-collection-array-indexer'
import { offerReceiverNftItems } from '@echo/model/helpers/offer/offer-receiver-nft-items'
import type { Offer } from '@echo/model/types/offer/offer'
import { assoc, has, pipe, uniq } from 'ramda'

export function addReceiverItemsCollectionSlug(modelObject: Partial<Offer>): Partial<Offer> {
  if (has('receiverItems', modelObject)) {
    return assoc(
      'receiverItemCollections',
      pipe(offerReceiverNftItems, itemsCollectionArrayIndexer, uniq)(modelObject as Offer),
      modelObject
    )
  }
  return modelObject
}
