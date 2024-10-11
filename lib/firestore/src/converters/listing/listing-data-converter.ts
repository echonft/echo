import { itemsDataConverter } from '@echo/firestore/converters/item-data-converter'
import { setReadOnly } from '@echo/firestore/helpers/converters/listing/from-firestore/set-read-only'
import { lowerCreatorWalletAddress } from '@echo/firestore/helpers/converters/listing/lower-creator-wallet-address'
import { addListingItemsCollectionSlug } from '@echo/firestore/helpers/converters/listing/to-firestore/add-listing-items-collection-slug'
import { addListingItemsIndex } from '@echo/firestore/helpers/converters/listing/to-firestore/add-listing-items-index'
import { lowerCreatorWalletAddressIfExists } from '@echo/firestore/helpers/converters/listing/to-firestore/lower-creator-wallet-address-if-exists'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { type ListingDocumentData } from '@echo/firestore/types/model/listing/listing-document-data'
import { type Listing } from '@echo/model/types/listing'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { type FirestoreDataConverter, QueryDocumentSnapshot, type WithFieldValue } from 'firebase-admin/firestore'
import { bind, dissoc, modify, pipe, unless } from 'ramda'

export const listingDataConverter: FirestoreDataConverter<Listing, ListingDocumentData> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<ListingDocumentData, ListingDocumentData>): Listing {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const boundDataConverter = bind(itemsDataConverter.fromFirestore, itemsDataConverter)
    return pipe<
      [QueryDocumentSnapshot<ListingDocumentData, ListingDocumentData>],
      ListingDocumentData,
      ListingDocumentData,
      Omit<ListingDocumentData, 'itemIndexes'>,
      Omit<ListingDocumentData, 'itemIndexes' | 'itemCollections'>,
      Omit<Listing, 'readOnly'>,
      Listing
    >(
      nonNullableReturn(getDocumentSnapshotData),
      lowerCreatorWalletAddress,
      dissoc('itemIndexes'),
      dissoc('itemCollections'),
      modify('items', boundDataConverter),
      setReadOnly
    )(snapshot)
  },
  toFirestore(modelObject: WithFieldValue<Listing>): WithFieldValue<ListingDocumentData> {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const boundDataConverter = bind(itemsDataConverter.toFirestore, itemsDataConverter)
    return pipe<
      [WithFieldValue<Listing>],
      WithFieldValue<Listing>,
      WithFieldValue<Omit<Listing, 'items'> & Pick<ListingDocumentData, 'items'>>,
      WithFieldValue<Omit<ListingDocumentData, 'itemIndexes' | 'itemCollections'>>,
      WithFieldValue<Omit<ListingDocumentData, 'itemCollections'>>,
      WithFieldValue<ListingDocumentData>
    >(
      lowerCreatorWalletAddressIfExists,
      unless(propIsNil('items'), modify('items', boundDataConverter)),
      dissoc('readOnly'),
      addListingItemsIndex,
      addListingItemsCollectionSlug
    )(modelObject)
  }
}
