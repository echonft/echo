import type { OfferDocumentData } from '@echo/firestore/types/model/offer/offer-document-data'
import { getOfferReceiverItemsIndexes } from '@echo/model/helpers/offer/get-offer-receiver-items-indexes'
import type { Nft } from '@echo/model/types/nft'
import type { WithFieldValue } from 'firebase-admin/firestore'
import { assoc, has } from 'ramda'

type ModelObject = WithFieldValue<
  Omit<
    OfferDocumentData,
    'receiverItemIndexes' | 'receiverItemCollections' | 'senderItemIndexes' | 'senderItemCollections'
  >
>
type WithReceiverItems = Omit<ModelObject, 'receiverItems'> & {
  receiverItems: Nft[]
}

function hasItems(modelObject: ModelObject): modelObject is WithReceiverItems {
  return has('receiverItems', modelObject)
}

export function addReceiverItemIndexes(
  modelObject: ModelObject
): WithFieldValue<Omit<OfferDocumentData, 'receiverItemCollections' | 'senderItemIndexes' | 'senderItemCollections'>> {
  if (hasItems(modelObject)) {
    return assoc('receiverItemIndexes', getOfferReceiverItemsIndexes(modelObject), modelObject)
  }
  return assoc('receiverItemIndexes', [], modelObject)
}
