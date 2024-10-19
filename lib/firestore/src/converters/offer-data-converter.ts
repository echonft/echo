import { itemsDataConverter } from '@echo/firestore/converters/items-data-converter'
import { addReceiverItemsCollectionSlug } from '@echo/firestore/helpers/converters/offer/to-firestore/add-receiver-items-collection-slug'
import { addReceiverItemsIndex } from '@echo/firestore/helpers/converters/offer/to-firestore/add-receiver-items-index'
import { addSenderItemsCollectionSlug } from '@echo/firestore/helpers/converters/offer/to-firestore/add-sender-items-collection-slug'
import { addSenderItemsIndex } from '@echo/firestore/helpers/converters/offer/to-firestore/add-sender-items-index'
import { lowerIdContractIfExists } from '@echo/firestore/helpers/converters/offer/to-firestore/lower-id-contract-if-exists'
import { lowerReceiverWalletAddressIfExists } from '@echo/firestore/helpers/converters/offer/to-firestore/lower-receiver-wallet-address-if-exists'
import { lowerSenderWalletAddressIfExists } from '@echo/firestore/helpers/converters/offer/to-firestore/lower-sender-wallet-address-if-exists'
import { normalizeSlugIfExists } from '@echo/firestore/helpers/converters/offer/to-firestore/normalize-slug-if-exists'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { type OfferDocumentData } from '@echo/firestore/types/model/offer-document-data'
import { type Offer } from '@echo/model/types/offer/offer'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { type FirestoreDataConverter, QueryDocumentSnapshot, type WithFieldValue } from 'firebase-admin/firestore'
import { bind, dissoc, modify, pipe, unless } from 'ramda'

export const offerDataConverter: FirestoreDataConverter<Offer, OfferDocumentData> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<OfferDocumentData, OfferDocumentData>): Offer {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const boundDataConverter = bind(itemsDataConverter.fromFirestore, itemsDataConverter)
    return pipe(
      nonNullableReturn(getDocumentSnapshotData<OfferDocumentData, OfferDocumentData>),
      dissoc('receiverItemIndexes'),
      dissoc('receiverItemCollections'),
      dissoc('senderItemIndexes'),
      dissoc('senderItemCollections'),
      modify('receiverItems', boundDataConverter),
      modify('senderItems', boundDataConverter)
    )(snapshot) as Offer
  },
  toFirestore(modelObject: WithFieldValue<Offer>): WithFieldValue<OfferDocumentData> {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const boundDataConverter = bind(itemsDataConverter.toFirestore, itemsDataConverter)
    return pipe(
      normalizeSlugIfExists,
      lowerReceiverWalletAddressIfExists,
      lowerSenderWalletAddressIfExists,
      lowerIdContractIfExists,
      unless(
        propIsNil('receiverItems'),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        pipe(modify('receiverItems', boundDataConverter), addReceiverItemsIndex, addReceiverItemsCollectionSlug)
      ),
      unless(
        propIsNil('senderItems'),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        pipe(modify('senderItems', boundDataConverter), addSenderItemsIndex, addSenderItemsCollectionSlug)
      )
    )(modelObject as Partial<Offer>) as WithFieldValue<OfferDocumentData>
  }
}
