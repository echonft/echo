import { getSnapshotData } from '@echo/firestore/helpers/converters/get-snapshot-data'
import { setReadOnly } from '@echo/firestore/helpers/converters/offer/from-firestore/set-read-only'
import { lowerReceiverItemsAddresses } from '@echo/firestore/helpers/converters/offer/lower-receiver-items-addresses'
import { lowerReceiverWalletAddress } from '@echo/firestore/helpers/converters/offer/lower-receiver-wallet-address'
import { lowerSenderItemsAddresses } from '@echo/firestore/helpers/converters/offer/lower-sender-items-addresses'
import { lowerSenderWalletAddress } from '@echo/firestore/helpers/converters/offer/lower-sender-wallet-address'
import { addReceiverItemsNftCollectionIds } from '@echo/firestore/helpers/converters/offer/to-firestore/add-receiver-items-nft-collection-ids'
import { addReceiverItemsNftIds } from '@echo/firestore/helpers/converters/offer/to-firestore/add-receiver-items-nft-ids'
import { addSenderItemsNftCollectionIds } from '@echo/firestore/helpers/converters/offer/to-firestore/add-sender-items-nft-collection-ids'
import { addSenderItemsNftIds } from '@echo/firestore/helpers/converters/offer/to-firestore/add-sender-items-nft-ids'
import { lowerReceiverItemsAddressesIfExists } from '@echo/firestore/helpers/converters/offer/to-firestore/lower-receiver-items-addresses-if-exists'
import { lowerReceiverWalletAddressIfExists } from '@echo/firestore/helpers/converters/offer/to-firestore/lower-receiver-wallet-address-if-exists'
import { lowerSenderItemsAddressesIfExists } from '@echo/firestore/helpers/converters/offer/to-firestore/lower-sender-items-addresses-if-exists'
import { lowerSenderWalletAddressIfExists } from '@echo/firestore/helpers/converters/offer/to-firestore/lower-sender-wallet-address-if-exists'
import { type OfferDocumentData } from '@echo/firestore/types/model/offer/offer-document-data'
import { type Offer } from '@echo/model/types/offer'
import { type FirestoreDataConverter, QueryDocumentSnapshot, type WithFieldValue } from 'firebase-admin/firestore'
import { dissoc, pipe } from 'ramda'

export const offerDataConverter: FirestoreDataConverter<Offer, OfferDocumentData> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<OfferDocumentData>): Offer {
    return pipe(
      getSnapshotData<OfferDocumentData>,
      dissoc('receiverItemsNftIds'),
      dissoc('receiverItemsNftCollectionIds'),
      dissoc('senderItemsNftIds'),
      dissoc('senderItemsNftCollectionIds'),
      lowerReceiverWalletAddress,
      lowerReceiverItemsAddresses,
      lowerSenderWalletAddress,
      lowerSenderItemsAddresses,
      setReadOnly
    )(snapshot)
  },
  toFirestore(modelObject: WithFieldValue<Offer>): WithFieldValue<OfferDocumentData> {
    return pipe(
      addReceiverItemsNftIds,
      addReceiverItemsNftCollectionIds,
      addSenderItemsNftIds,
      addSenderItemsNftCollectionIds,
      lowerReceiverItemsAddressesIfExists,
      lowerReceiverWalletAddressIfExists,
      lowerSenderItemsAddressesIfExists,
      lowerSenderWalletAddressIfExists,
      dissoc('readOnly')
    )(modelObject) as WithFieldValue<OfferDocumentData>
  }
}
