import type { OfferDocumentData } from '@echo/firestore/types/model/offer/offer-document-data'
import { getOfferSenderItemsCollectionSlugs } from '@echo/model/helpers/offer/get-offer-sender-items-collection-slugs'
import type { Nft } from '@echo/model/types/nft'
import type { WithFieldValue } from 'firebase-admin/firestore'
import { assoc, has } from 'ramda'

type ModelObject = WithFieldValue<Omit<OfferDocumentData, 'senderItemCollections'>>
type WithSenderItems = Omit<ModelObject, 'senderItems'> & {
  senderItems: Nft[]
}

function hasItems(modelObject: ModelObject): modelObject is WithSenderItems {
  return has('senderItems', modelObject)
}

export function addSenderItemCollections(modelObject: ModelObject): WithFieldValue<OfferDocumentData> {
  if (hasItems(modelObject)) {
    return assoc('senderItemCollections', getOfferSenderItemsCollectionSlugs(modelObject), modelObject)
  }
  return assoc('senderItemCollections', [], modelObject)
}
