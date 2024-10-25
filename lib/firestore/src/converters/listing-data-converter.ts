import { addListingItemsCollectionSlug } from '@echo/firestore/helpers/converters/listing/to-firestore/add-listing-items-collection-slug'
import { addListingItemsIndex } from '@echo/firestore/helpers/converters/listing/to-firestore/add-listing-items-index'
import { lowerCreatorWalletAddressIfExists } from '@echo/firestore/helpers/converters/listing/to-firestore/lower-creator-wallet-address-if-exists'
import { type ListingDocumentData } from '@echo/firestore/types/model/listing-document-data'
import { type Listing } from '@echo/model/types/listing'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { QueryDocumentSnapshot, type WithFieldValue } from 'firebase-admin/firestore'
import { dissoc, invoker, pipe, unless } from 'ramda'

export const listingDataConverter = {
  fromFirestore(snapshot: QueryDocumentSnapshot<ListingDocumentData, ListingDocumentData>): Listing {
    return pipe<
      [QueryDocumentSnapshot<ListingDocumentData, ListingDocumentData>],
      ListingDocumentData,
      Omit<ListingDocumentData, 'itemIndexes'>,
      Omit<ListingDocumentData, 'itemIndexes' | 'itemCollections'>,
      Listing
    >(
      invoker(0, 'data'),
      dissoc('itemIndexes'),
      dissoc('itemCollections'),
      dissoc('signature')
    )(snapshot)
  },
  toFirestore(modelObject: WithFieldValue<Listing>): WithFieldValue<ListingDocumentData> {
    return pipe(
      lowerCreatorWalletAddressIfExists,
      unless(propIsNil('items'), pipe(addListingItemsIndex, addListingItemsCollectionSlug))
    )(modelObject) as WithFieldValue<ListingDocumentData>
  }
}
