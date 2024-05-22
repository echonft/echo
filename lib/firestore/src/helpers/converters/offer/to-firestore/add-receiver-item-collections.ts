import type { OfferDocumentData } from '@echo/firestore/types/model/offer/offer-document-data'
import { getNftsCollectionSlugs } from '@echo/model/helpers/nft/get-nfts-collection-slugs'
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
    return assoc('receiverItemCollections', getNftsCollectionSlugs(modelObject.receiverItems), modelObject)
  }
  return assoc('receiverItemCollections', [], modelObject)
}
