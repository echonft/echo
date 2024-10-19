import { itemsDataConverter } from '@echo/firestore/converters/items-data-converter'
import { addListingItemsCollectionSlug } from '@echo/firestore/helpers/converters/listing/to-firestore/add-listing-items-collection-slug'
import { addListingItemsIndex } from '@echo/firestore/helpers/converters/listing/to-firestore/add-listing-items-index'
import { lowerCreatorWalletAddressIfExists } from '@echo/firestore/helpers/converters/listing/to-firestore/lower-creator-wallet-address-if-exists'
import { normalizeSlugIfExists } from '@echo/firestore/helpers/converters/listing/to-firestore/normalize-slug-if-exists'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { type ListingDocumentData } from '@echo/firestore/types/model/listing-document-data'
import { type Listing } from '@echo/model/types/listing/listing'
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
      Omit<ListingDocumentData, 'itemIndexes'>,
      Omit<ListingDocumentData, 'itemIndexes' | 'itemCollections'>,
      Listing
    >(
      nonNullableReturn(getDocumentSnapshotData),
      dissoc('itemIndexes'),
      dissoc('itemCollections'),
      modify('items', boundDataConverter)
    )(snapshot)
  },
  toFirestore(modelObject: WithFieldValue<Listing>): WithFieldValue<ListingDocumentData> {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const boundDataConverter = bind(itemsDataConverter.toFirestore, itemsDataConverter)
    return pipe(
      lowerCreatorWalletAddressIfExists,
      normalizeSlugIfExists,
      unless(
        propIsNil('items'),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        pipe(modify('items', boundDataConverter), addListingItemsIndex, addListingItemsCollectionSlug)
      )
    )(modelObject) as WithFieldValue<ListingDocumentData>
  }
}
