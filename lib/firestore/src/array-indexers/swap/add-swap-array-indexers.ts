import { itemsCollectionArrayIndexer } from '@echo/firestore/array-indexers/item/items-collection-array-indexer'
import { itemsNftArrayIndexer } from '@echo/firestore/array-indexers/item/items-nft-array-indexer'
import type { SwapDocument } from '@echo/firestore/types/model/swap-document'
import { swapReceiverNftItems } from '@echo/model/helpers/swap/swap-receiver-nft-items'
import { swapSenderNftItems } from '@echo/model/helpers/swap/swap-sender-nft-items'
import { assoc, pipe, uniq } from 'ramda'

export function addSwapArrayIndexers(
  data: Omit<
    SwapDocument,
    'receiverItemCollections' | 'receiverItemIndexes' | 'senderItemCollections' | 'senderItemIndexes'
  >
): SwapDocument {
  const receiverItems = swapReceiverNftItems(data)
  const senderItems = swapSenderNftItems(data)
  const receiverItemCollections = pipe(itemsCollectionArrayIndexer, uniq)(receiverItems)
  const receiverItemIndexes = itemsNftArrayIndexer(receiverItems)
  const senderItemCollections = pipe(itemsCollectionArrayIndexer, uniq)(senderItems)
  const senderItemIndexes = itemsNftArrayIndexer(senderItems)
  return pipe(
    assoc('receiverItemCollections', receiverItemCollections),
    assoc('receiverItemIndexes', receiverItemIndexes),
    assoc('senderItemCollections', senderItemCollections),
    assoc('senderItemIndexes', senderItemIndexes)
  )(data)
}
