import type { OfferDocumentData } from '@echo/firestore/types/model/offer-document-data'
import { getOfferSenderItemsIndexes } from '@echo/model/helpers/offer/get-offer-sender-items-indexes'
import type { WithFieldValue } from 'firebase-admin/firestore'
import { assoc, has } from 'ramda'

type ModelObject = WithFieldValue<Omit<OfferDocumentData, 'senderItemIndexes' | 'senderItemCollections'>>
type WithSenderItems = Omit<ModelObject, 'senderItems'> & Pick<OfferDocumentData, 'senderItems'>

function hasItems(modelObject: ModelObject): modelObject is WithSenderItems {
  return has('senderItems', modelObject)
}

export function addSenderItemIndexes(
  modelObject: ModelObject
): WithFieldValue<Omit<OfferDocumentData, 'senderItemCollections'>> {
  if (hasItems(modelObject)) {
    return assoc('senderItemIndexes', getOfferSenderItemsIndexes(modelObject), modelObject)
  }
  return assoc('senderItemIndexes', [], modelObject)
}
