import type { OfferDocument } from '@echo/firestore/types/model/offer-document'
import { offerMockFromJohnnycage, offerMockToJohnnycage } from '@echo/model/mocks/offer-mock'
import { type Offer } from '@echo/model/types/offer'
import { removeNilProps } from '@echo/utils/helpers/remove-nil-props'

export const offerDocumentMockToJohnnycage: OfferDocument = {
  ...removeNilProps<Offer, OfferDocument>(offerMockToJohnnycage),
  receiverItemCollections: ['spiral-frequencies'],
  receiverItemIndexes: ['spiral-frequencies.1'],
  senderItemCollections: ['pxmythics-genesis'],
  senderItemIndexes: ['pxmythics-genesis.3']
}

export const offerDocumentMockFromJohnnycage: OfferDocument = {
  ...removeNilProps<Offer, OfferDocument>(offerMockFromJohnnycage),
  receiverItemIndexes: ['pxmythics-genesis.3'],
  receiverItemCollections: ['pxmythics-genesis'],
  senderItemCollections: ['spiral-frequencies'],
  senderItemIndexes: ['spiral-frequencies.1', 'spiral-frequencies.2']
}
