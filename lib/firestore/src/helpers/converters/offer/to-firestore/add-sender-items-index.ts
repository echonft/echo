import { itemsNftArrayIndexer } from '@echo/firestore/array-indexers/item/items-nft-array-indexer'
import { nftItems } from '@echo/model/helpers/item/nft-items'
import type { Offer } from '@echo/model/types/offer/offer'
import { assoc, has, pipe, prop } from 'ramda'

export function addSenderItemsIndex(modelObject: Partial<Offer>): Partial<Offer> {
  if (has('senderItems', modelObject)) {
    return assoc(
      'senderItemIndexes',
      pipe(prop('senderItems'), nftItems, itemsNftArrayIndexer)(modelObject),
      modelObject
    )
  }
  return modelObject
}
