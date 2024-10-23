import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { getReferenceById } from '@echo/firestore/helpers/crud/reference/get-reference-by-id'
import { getReferenceData } from '@echo/firestore/helpers/crud/reference/get-reference-data'
import type { ListingDocumentData } from '@echo/firestore/types/model/listing-document-data'
import type { Listing } from '@echo/model/types/listing/listing'
import type { Nullable } from '@echo/utils/types/nullable'
import type { DocumentReference } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

function getListingReferenceById(id: string): DocumentReference<Listing, ListingDocumentData> {
  return getReferenceById({ collectionReference: getListingsCollectionReference(), id })
}

export function getListingById(id: string): Promise<Nullable<Listing>> {
  return pipe(getListingReferenceById, getReferenceData)(id)
}
