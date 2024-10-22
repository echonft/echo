import { itemsNftArrayIndexer } from '@echo/firestore/array-indexers/item/items-nft-array-indexer'
import { nftItems } from '@echo/model/helpers/item/nft-items'
import { offerReceiverItems } from '@echo/model/helpers/offer/offer-receiver-items'
import type { Offer } from '@echo/model/types/offer/offer'
import { assoc, has, pipe } from 'ramda'

export function addReceiverItemsIndex(modelObject: Partial<Offer>): Partial<Offer> {
  if (has('receiverItems', modelObject)) {
    return assoc(
      'receiverItemIndexes',
      pipe(offerReceiverItems, nftItems, itemsNftArrayIndexer)(modelObject as Offer),
      modelObject
    )
  }
  return modelObject
}
