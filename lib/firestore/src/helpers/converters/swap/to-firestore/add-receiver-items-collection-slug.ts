import { itemsCollectionArrayIndexer } from '@echo/firestore/array-indexers/item/items-collection-array-indexer'
import { swapReceiverNftItems } from '@echo/model/helpers/swap/swap-receiver-nft-items'
import type { Swap } from '@echo/model/types/swap/swap'
import { assoc, has, pipe, uniq } from 'ramda'

export function addReceiverItemsCollectionSlug(modelObject: Partial<Swap>): Partial<Swap> {
  if (has('receiverItems', modelObject)) {
    return assoc(
      'receiverItemCollections',
      pipe(swapReceiverNftItems, itemsCollectionArrayIndexer, uniq)(modelObject as Swap),
      modelObject
    )
  }
  return modelObject
}
