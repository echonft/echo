import { itemsCollectionArrayIndexer } from '@echo/firestore/array-indexers/item/items-collection-array-indexer'
import { itemsNftArrayIndexer } from '@echo/firestore/array-indexers/item/items-nft-array-indexer'
import type { OfferDocument } from '@echo/firestore/types/model/offer-document'
import { offerReceiverNftItems } from '@echo/model/helpers/offer/offer-receiver-nft-items'
import { offerSenderNftItems } from '@echo/model/helpers/offer/offer-sender-nft-items'
import { assoc, pipe, uniq } from 'ramda'

export function addOfferArrayIndexers<
  T extends Partial<OfferDocument> & Required<Pick<OfferDocument, 'receiverItems' | 'senderItems'>>
>(data: T) {
  const receiverItems = offerReceiverNftItems(data)
  const senderItems = offerSenderNftItems(data)
  const receiverItemCollections = pipe(itemsCollectionArrayIndexer, uniq)(receiverItems)
  const receiverItemIndexes = itemsNftArrayIndexer(receiverItems)
  const senderItemCollections = pipe(itemsCollectionArrayIndexer, uniq)(senderItems)
  const senderItemIndexes = itemsNftArrayIndexer(senderItems)
  return pipe(
    assoc('receiverItemCollections', receiverItemCollections),
    assoc('receiverItemIndexes', receiverItemIndexes),
    assoc('senderItemCollections', senderItemCollections),
    assoc('senderItemIndexes', senderItemIndexes)
  )(data) as T &
    Pick<
      OfferDocument,
      'receiverItemCollections' | 'receiverItemIndexes' | 'senderItemCollections' | 'senderItemIndexes'
    >
}
