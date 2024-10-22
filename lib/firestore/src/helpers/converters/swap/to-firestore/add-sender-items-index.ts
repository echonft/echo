import { itemsNftArrayIndexer } from '@echo/firestore/array-indexers/item/items-nft-array-indexer'
import { swapSenderNftItems } from '@echo/model/helpers/swap/swap-sender-nft-items'
import type { Swap } from '@echo/model/types/swap/swap'
import { assoc, has, pipe } from 'ramda'

export function addSenderItemsIndex(modelObject: Partial<Swap>): Partial<Swap> {
  if (has('senderItems', modelObject)) {
    return assoc('senderItemIndexes', pipe(swapSenderNftItems, itemsNftArrayIndexer)(modelObject as Swap), modelObject)
  }
  return modelObject
}
