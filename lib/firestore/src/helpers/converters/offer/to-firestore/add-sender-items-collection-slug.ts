import { itemsCollectionArrayIndexer } from '@echo/firestore/array-indexers/item/items-collection-array-indexer'
import { nftItems } from '@echo/model/helpers/item/nft-items'
import { offerSenderItems } from '@echo/model/helpers/offer/offer-sender-items'
import type { Offer } from '@echo/model/types/offer/offer'
import { assoc, has, pipe, uniq } from 'ramda'

export function addSenderItemsCollectionSlug(modelObject: Partial<Offer>): Partial<Offer> {
  if (has('senderItems', modelObject)) {
    return assoc(
      'senderItemCollections',
      pipe(offerSenderItems, nftItems, itemsCollectionArrayIndexer, uniq)(modelObject as Offer),
      modelObject
    )
  }
  return modelObject
}
