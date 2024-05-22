import { setReadOnly } from '@echo/firestore/helpers/converters/listing/from-firestore/set-read-only'
import { lowerCreatorWalletAddress } from '@echo/firestore/helpers/converters/listing/lower-creator-wallet-address'
import { addItemCollections } from '@echo/firestore/helpers/converters/listing/to-firestore/add-item-collections'
import { addItemIndexes } from '@echo/firestore/helpers/converters/listing/to-firestore/add-item-indexes'
import { lowerCreatorWalletAddressIfExists } from '@echo/firestore/helpers/converters/listing/to-firestore/lower-creator-wallet-address-if-exists'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { type ListingDocumentData } from '@echo/firestore/types/model/listing/listing-document-data'
import { type Listing } from '@echo/model/types/listing'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { type FirestoreDataConverter, QueryDocumentSnapshot, type WithFieldValue } from 'firebase-admin/firestore'
import { dissoc, pipe } from 'ramda'

export const listingDataConverter: FirestoreDataConverter<Listing, ListingDocumentData> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<ListingDocumentData>): Listing {
    return pipe<
      [QueryDocumentSnapshot<ListingDocumentData>],
      ListingDocumentData,
      ListingDocumentData,
      Omit<ListingDocumentData, 'itemIndexes'>,
      Listing
    >(
      nonNullableReturn(getDocumentSnapshotData<ListingDocumentData>),
      lowerCreatorWalletAddress,
      dissoc('itemIndexes'),
      setReadOnly
    )(snapshot)
  },
  toFirestore(modelObject: WithFieldValue<Listing>): WithFieldValue<ListingDocumentData> {
    return pipe<
      [WithFieldValue<Listing>],
      WithFieldValue<Listing>,
      WithFieldValue<Omit<ListingDocumentData, 'itemIndexes' | 'itemCollections'>>,
      WithFieldValue<Omit<ListingDocumentData, 'itemCollections'>>,
      WithFieldValue<ListingDocumentData>
    >(
      lowerCreatorWalletAddressIfExists,
      dissoc('readOnly'),
      addItemIndexes,
      addItemCollections
    )(modelObject)
  }
}
