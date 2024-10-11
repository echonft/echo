import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference/collection-reference-name'
import { type ListingDocumentData } from '@echo/firestore/types/model/listing/listing-document-data'
import { listingMockId } from '@echo/model/mocks/listing/listing-mock'
import type { Listing } from '@echo/model/types/listing'
import { DocumentReference } from 'firebase-admin/firestore'

export function listingReferenceMock(): Record<string, DocumentReference<Listing, ListingDocumentData>> {
  const id = listingMockId()
  return {
    jUzMtPGKM62mMhEcmbN4: {
      id,
      path: `${CollectionReferenceName.LISTINGS}/${id}`
    } as unknown as DocumentReference<Listing, ListingDocumentData>
  }
}
