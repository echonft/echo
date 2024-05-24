import type { OfferDocumentData } from '@echo/firestore/types/model/offer/offer-document-data'
import { getOfferReceiverItemsCollectionSlugs } from '@echo/model/helpers/offer/get-offer-receiver-items-collection-slugs'
import type { Nft } from '@echo/model/types/nft'
import type { WithFieldValue } from 'firebase-admin/firestore'
import { assoc, has } from 'ramda'

type ModelObject = WithFieldValue<
  Omit<OfferDocumentData, 'receiverItemCollections' | 'senderItemIndexes' | 'senderItemCollections'>
>
type WithReceiverItems = Omit<ModelObject, 'receiverItems'> & {
  receiverItems: Nft[]
}

function hasItems(modelObject: ModelObject): modelObject is WithReceiverItems {
  return has('receiverItems', modelObject)
}

export function addReceiverItemCollections(
  modelObject: ModelObject
): WithFieldValue<Omit<OfferDocumentData, 'senderItemIndexes' | 'senderItemCollections'>> {
  if (hasItems(modelObject)) {
    return assoc('receiverItemCollections', getOfferReceiverItemsCollectionSlugs(modelObject), modelObject)
  }
  return assoc('receiverItemCollections', [], modelObject)
}
