import { itemsCollectionArrayIndexer } from '@echo/firestore/array-indexers/item/items-collection-array-indexer'
import { nftItems } from '@echo/model/helpers/item/nft-items'
import type { Offer } from '@echo/model/types/offer/offer'
import { assoc, has, pipe, prop, uniq } from 'ramda'

export function addSenderItemsCollectionSlug(modelObject: Partial<Offer>): Partial<Offer> {
  if (has('senderItems', modelObject)) {
    return assoc(
      'senderItemCollections',
      pipe(prop('senderItems'), nftItems, itemsCollectionArrayIndexer, uniq)(modelObject),
      modelObject
    )
  }
  return modelObject
}
