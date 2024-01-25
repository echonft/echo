import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference/collection-reference-name'
import { listingDataConverter } from '@echo/firestore/converters/listing/listing-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { ListingDocumentData } from '@echo/firestore/types/model/listing/listing-document-data'
import type { Listing } from '@echo/model/types/listing'
import type { CollectionReference } from 'firebase-admin/firestore'

export function getListingsCollectionReference(): CollectionReference<Listing, ListingDocumentData> {
  return firestoreApp()
    .collection(CollectionReferenceName.LISTINGS)
    .withConverter<Listing, ListingDocumentData>(listingDataConverter)
}
