import { itemsCollectionArrayIndexer } from '@echo/firestore/array-indexers/item/items-collection-array-indexer'
import { nftItems } from '@echo/model/helpers/item/nft-items'
import { offerReceiverItems } from '@echo/model/helpers/offer/offer-receiver-items'
import type { Offer } from '@echo/model/types/offer/offer'
import { assoc, has, pipe, uniq } from 'ramda'

export function addReceiverItemsCollectionSlug(modelObject: Partial<Offer>): Partial<Offer> {
  if (has('receiverItems', modelObject)) {
    return assoc(
      'receiverItemCollections',
      pipe(offerReceiverItems, nftItems, itemsCollectionArrayIndexer, uniq)(modelObject as Offer),
      modelObject
    )
  }
  return modelObject
}
