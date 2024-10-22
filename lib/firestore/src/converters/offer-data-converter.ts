import { itemsDataConverter } from '@echo/firestore/converters/items-data-converter'
import { addReceiverItemsCollectionSlug } from '@echo/firestore/helpers/converters/offer/to-firestore/add-receiver-items-collection-slug'
import { addReceiverItemsIndex } from '@echo/firestore/helpers/converters/offer/to-firestore/add-receiver-items-index'
import { addSenderItemsCollectionSlug } from '@echo/firestore/helpers/converters/offer/to-firestore/add-sender-items-collection-slug'
import { addSenderItemsIndex } from '@echo/firestore/helpers/converters/offer/to-firestore/add-sender-items-index'
import { lowerIdContractIfExists } from '@echo/firestore/helpers/converters/offer/to-firestore/lower-id-contract-if-exists'
import { lowerReceiverWalletAddressIfExists } from '@echo/firestore/helpers/converters/offer/to-firestore/lower-receiver-wallet-address-if-exists'
import { lowerSenderWalletAddressIfExists } from '@echo/firestore/helpers/converters/offer/to-firestore/lower-sender-wallet-address-if-exists'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { type OfferDocumentData } from '@echo/firestore/types/model/offer-document-data'
import { type Offer } from '@echo/model/types/offer/offer'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { QueryDocumentSnapshot, type WithFieldValue } from 'firebase-admin/firestore'
import { dissoc, modify, pipe, unless } from 'ramda'

export const offerDataConverter = {
  fromFirestore(snapshot: QueryDocumentSnapshot<OfferDocumentData, OfferDocumentData>): Offer {
    return pipe(
      nonNullableReturn(getDocumentSnapshotData<OfferDocumentData, OfferDocumentData>),
      dissoc('receiverItemIndexes'),
      dissoc('receiverItemCollections'),
      dissoc('senderItemIndexes'),
      dissoc('senderItemCollections'),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      modify('receiverItems', (obj) => itemsDataConverter.fromFirestore(obj)),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      modify('senderItems', (obj) => itemsDataConverter.fromFirestore(obj))
    )(snapshot) as Offer
  },
  toFirestore(modelObject: WithFieldValue<Offer>): WithFieldValue<OfferDocumentData> {
    return pipe(
      lowerReceiverWalletAddressIfExists,
      lowerSenderWalletAddressIfExists,
      lowerIdContractIfExists,
      unless(
        propIsNil('receiverItems'),
        pipe(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          modify('receiverItems', (modelObject) => itemsDataConverter.toFirestore(modelObject)),
          addReceiverItemsIndex,
          addReceiverItemsCollectionSlug
        )
      ),
      unless(
        propIsNil('senderItems'),
        pipe(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          modify('senderItems', (modelObject) => itemsDataConverter.toFirestore(modelObject)),
          addSenderItemsIndex,
          addSenderItemsCollectionSlug
        )
      )
    )(modelObject as Partial<Offer>) as WithFieldValue<OfferDocumentData>
  }
}
