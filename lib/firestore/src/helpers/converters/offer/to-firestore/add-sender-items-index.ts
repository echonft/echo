import { itemsNftArrayIndexer } from '@echo/firestore/array-indexers/item/items-nft-array-indexer'
import { offerSenderNftItems } from '@echo/model/helpers/offer/offer-sender-nft-items'
import type { Offer } from '@echo/model/types/offer'
import { assoc, has, pipe } from 'ramda'

export function addSenderItemsIndex(modelObject: Partial<Offer>): Partial<Offer> {
  if (has('senderItems', modelObject)) {
    return assoc(
      'senderItemIndexes',
      pipe(offerSenderNftItems, itemsNftArrayIndexer)(modelObject as Offer),
      modelObject
    )
  }
  return modelObject
}
