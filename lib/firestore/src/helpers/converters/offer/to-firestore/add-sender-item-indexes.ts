import type { OfferDocumentData } from '@echo/firestore/types/model/offer/offer-document-data'
import { mapNftsToNftIndexes } from '@echo/model/helpers/nft/map-nfts-to-nft-indexes'
import type { Nft } from '@echo/model/types/nft'
import type { WithFieldValue } from 'firebase-admin/firestore'
import { assoc, has } from 'ramda'

type ModelObject = WithFieldValue<Omit<OfferDocumentData, 'senderItemIndexes' | 'senderItemCollections'>>
type WithSenderItems = Omit<ModelObject, 'senderItems'> & {
  senderItems: Nft[]
}

function hasItems(modelObject: ModelObject): modelObject is WithSenderItems {
  return has('senderItems', modelObject)
}

export function addSenderItemIndexes(
  modelObject: ModelObject
): WithFieldValue<Omit<OfferDocumentData, 'senderItemCollections'>> {
  if (hasItems(modelObject)) {
    return assoc('senderItemIndexes', mapNftsToNftIndexes(modelObject.senderItems), modelObject)
  }
  return assoc('senderItemIndexes', [], modelObject)
}
