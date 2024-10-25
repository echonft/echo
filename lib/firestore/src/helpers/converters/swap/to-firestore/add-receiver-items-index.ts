import { itemsNftArrayIndexer } from '@echo/firestore/array-indexers/item/items-nft-array-indexer'
import { swapReceiverNftItems } from '@echo/model/helpers/swap/swap-receiver-nft-items'
import type { Swap } from '@echo/model/types/swap'
import { assoc, has, pipe } from 'ramda'

export function addReceiverItemsIndex(modelObject: Partial<Swap>): Partial<Swap> {
  if (has('receiverItems', modelObject)) {
    return assoc(
      'receiverItemIndexes',
      pipe(swapReceiverNftItems, itemsNftArrayIndexer)(modelObject as Swap),
      modelObject
    )
  }
  return modelObject
}
