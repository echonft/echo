import type { OfferDocumentData } from '@echo/firestore/types/model/offer/offer-document-data'
import { getNftIndexForNfts } from '@echo/model/helpers/nft/get-nft-index-for-nfts'
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
    return assoc('senderItemIndexes', getNftIndexForNfts(modelObject.senderItems), modelObject)
  }
  return assoc('senderItemIndexes', [], modelObject)
}
