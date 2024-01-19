import { getSnapshotData } from '@echo/firestore/helpers/converters/from-firestore/get-snapshot-data'
import { setReadOnly } from '@echo/firestore/helpers/converters/listing/from-firestore/set-read-only'
import { lowerCreatorWalletAddress } from '@echo/firestore/helpers/converters/listing/lower-creator-wallet-address'
import { lowerItemsAddresses } from '@echo/firestore/helpers/converters/listing/lower-items-addresses'
import { lowerTargetsCollectionAddress } from '@echo/firestore/helpers/converters/listing/lower-targets-collection-address'
import { addItemsNftCollectionIds } from '@echo/firestore/helpers/converters/listing/to-firestore/add-items-nft-collection-ids'
import { addItemsNftIds } from '@echo/firestore/helpers/converters/listing/to-firestore/add-items-nft-ids'
import { addTargetIds } from '@echo/firestore/helpers/converters/listing/to-firestore/add-target-ids'
import { lowerCreatorWalletAddressIfExists } from '@echo/firestore/helpers/converters/listing/to-firestore/lower-creator-wallet-address-if-exists'
import { lowerItemsAddressesIfExists } from '@echo/firestore/helpers/converters/listing/to-firestore/lower-items-addresses-if-exists'
import { lowerTargetsCollectionAddressIfExists } from '@echo/firestore/helpers/converters/listing/to-firestore/lower-targets-collection-address-if-exists'
import { type ListingDocumentData } from '@echo/firestore/types/model/listing/listing-document-data'
import { type Listing } from '@echo/model/types/listing'
import { type FirestoreDataConverter, QueryDocumentSnapshot, type WithFieldValue } from 'firebase-admin/firestore'
import { dissoc, pipe } from 'ramda'

export const listingDataConverter: FirestoreDataConverter<Listing, ListingDocumentData> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<ListingDocumentData>) {
    return pipe(
      getSnapshotData<ListingDocumentData>,
      dissoc('itemsNftIds'),
      dissoc('itemsNftCollectionIds'),
      dissoc('targetsIds'),
      lowerCreatorWalletAddress,
      lowerItemsAddresses,
      lowerTargetsCollectionAddress,
      setReadOnly
    )(snapshot)
  },
  toFirestore(modelObject: WithFieldValue<Listing>) {
    return pipe(
      addItemsNftIds,
      addItemsNftCollectionIds,
      addTargetIds,
      lowerCreatorWalletAddressIfExists,
      lowerItemsAddressesIfExists,
      lowerTargetsCollectionAddressIfExists,
      dissoc('readOnly')
    )(modelObject as Partial<WithFieldValue<Listing>>) as WithFieldValue<ListingDocumentData>
  }
}
