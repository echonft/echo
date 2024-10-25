import { addReceiverItemsCollectionSlug } from '@echo/firestore/helpers/converters/offer/to-firestore/add-receiver-items-collection-slug'
import { addReceiverItemsIndex } from '@echo/firestore/helpers/converters/offer/to-firestore/add-receiver-items-index'
import { addSenderItemsCollectionSlug } from '@echo/firestore/helpers/converters/offer/to-firestore/add-sender-items-collection-slug'
import { addSenderItemsIndex } from '@echo/firestore/helpers/converters/offer/to-firestore/add-sender-items-index'
import { lowerIdContractIfExists } from '@echo/firestore/helpers/converters/offer/to-firestore/lower-id-contract-if-exists'
import { lowerReceiverWalletAddressIfExists } from '@echo/firestore/helpers/converters/offer/to-firestore/lower-receiver-wallet-address-if-exists'
import { lowerSenderWalletAddressIfExists } from '@echo/firestore/helpers/converters/offer/to-firestore/lower-sender-wallet-address-if-exists'
import { type OfferDocumentData } from '@echo/firestore/types/model/offer-document-data'
import { type Offer } from '@echo/model/types/offer'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { QueryDocumentSnapshot, type WithFieldValue } from 'firebase-admin/firestore'
import { dissoc, invoker, pipe, unless } from 'ramda'

export const offerDataConverter = {
  fromFirestore(snapshot: QueryDocumentSnapshot<OfferDocumentData, OfferDocumentData>): Offer {
    return pipe(
      invoker(0, 'data'),
      dissoc('receiverItemIndexes'),
      dissoc('receiverItemCollections'),
      dissoc('senderItemIndexes'),
      dissoc('senderItemCollections')
    )(snapshot) as Offer
  },
  toFirestore(modelObject: WithFieldValue<Offer>): WithFieldValue<OfferDocumentData> {
    return pipe(
      lowerReceiverWalletAddressIfExists,
      lowerSenderWalletAddressIfExists,
      lowerIdContractIfExists,
      unless(propIsNil('receiverItems'), pipe(addReceiverItemsIndex, addReceiverItemsCollectionSlug)),
      unless(propIsNil('senderItems'), pipe(addSenderItemsIndex, addSenderItemsCollectionSlug))
    )(modelObject as Partial<Offer>) as WithFieldValue<OfferDocumentData>
  }
}
