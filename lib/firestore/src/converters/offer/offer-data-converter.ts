import { setReadOnly } from '@echo/firestore/helpers/converters/offer/from-firestore/set-read-only'
import { lowerIdContract } from '@echo/firestore/helpers/converters/offer/lower-id-contract'
import { lowerReceiverWalletAddress } from '@echo/firestore/helpers/converters/offer/lower-receiver-wallet-address'
import { lowerSenderWalletAddress } from '@echo/firestore/helpers/converters/offer/lower-sender-wallet-address'
import { addReceiverItemCollections } from '@echo/firestore/helpers/converters/offer/to-firestore/add-receiver-item-collections'
import { addReceiverItemIndexes } from '@echo/firestore/helpers/converters/offer/to-firestore/add-receiver-item-indexes'
import { addSenderItemCollections } from '@echo/firestore/helpers/converters/offer/to-firestore/add-sender-item-collections'
import { addSenderItemIndexes } from '@echo/firestore/helpers/converters/offer/to-firestore/add-sender-item-indexes'
import { lowerIdContractIfExists } from '@echo/firestore/helpers/converters/offer/to-firestore/lower-id-contract-if-exists'
import { lowerReceiverWalletAddressIfExists } from '@echo/firestore/helpers/converters/offer/to-firestore/lower-receiver-wallet-address-if-exists'
import { lowerSenderWalletAddressIfExists } from '@echo/firestore/helpers/converters/offer/to-firestore/lower-sender-wallet-address-if-exists'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { type OfferDocumentData } from '@echo/firestore/types/model/offer/offer-document-data'
import { type Offer } from '@echo/model/types/offer'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { type FirestoreDataConverter, QueryDocumentSnapshot, type WithFieldValue } from 'firebase-admin/firestore'
import { dissoc, pipe } from 'ramda'

export const offerDataConverter: FirestoreDataConverter<Offer, OfferDocumentData> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<OfferDocumentData>): Offer {
    return pipe(
      nonNullableReturn(getDocumentSnapshotData<OfferDocumentData>),
      lowerReceiverWalletAddress,
      lowerSenderWalletAddress,
      lowerIdContract,
      dissoc('receiverItemIndexes'),
      dissoc('receiverItemCollections'),
      dissoc('senderItemIndexes'),
      dissoc('senderItemCollections'),
      setReadOnly
    )(snapshot)
  },
  toFirestore(modelObject: WithFieldValue<Offer>): WithFieldValue<OfferDocumentData> {
    return pipe(
      lowerReceiverWalletAddressIfExists,
      lowerSenderWalletAddressIfExists,
      lowerIdContractIfExists,
      addReceiverItemIndexes,
      addReceiverItemCollections,
      addSenderItemIndexes,
      addSenderItemCollections,
      dissoc('readOnly')
    )(modelObject) as WithFieldValue<OfferDocumentData>
  }
}
