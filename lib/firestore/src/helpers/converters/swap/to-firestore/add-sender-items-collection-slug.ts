import { itemsCollectionArrayIndexer } from '@echo/firestore/array-indexers/item/items-collection-array-indexer'
import { swapSenderNftItems } from '@echo/model/helpers/swap/swap-sender-nft-items'
import type { Swap } from '@echo/model/types/swap/swap'
import { assoc, has, pipe, uniq } from 'ramda'

export function addSenderItemsCollectionSlug(modelObject: Partial<Swap>): Partial<Swap> {
  if (has('senderItems', modelObject)) {
    return assoc(
      'senderItemCollections',
      pipe(swapSenderNftItems, itemsCollectionArrayIndexer, uniq)(modelObject as Swap),
      modelObject
    )
  }
  return modelObject
}
