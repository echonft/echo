import { itemsNftArrayIndexer } from '@echo/firestore/array-indexers/item/items-nft-array-indexer'
import { offerReceiverNftItems } from '@echo/model/helpers/offer/offer-receiver-nft-items'
import type { Offer } from '@echo/model/types/offer'
import { assoc, has, pipe } from 'ramda'

export function addReceiverItemsIndex(modelObject: Partial<Offer>): Partial<Offer> {
  if (has('receiverItems', modelObject)) {
    return assoc(
      'receiverItemIndexes',
      pipe(offerReceiverNftItems, itemsNftArrayIndexer)(modelObject as Offer),
      modelObject
    )
  }
  return modelObject
}
