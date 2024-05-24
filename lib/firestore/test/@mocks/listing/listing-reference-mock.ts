import { type ListingDocumentData } from '@echo/firestore/types/model/listing/listing-document-data'
import { LISTING_MOCK_ID } from '@echo/model-mocks/listing/listing-mock'
import { DocumentReference } from 'firebase-admin/firestore'

export const listingReferenceMock: Record<string, DocumentReference<ListingDocumentData>> = {
  jUzMtPGKM62mMhEcmbN4: {
    id: LISTING_MOCK_ID,
    path: `listings/${LISTING_MOCK_ID}`
  } as unknown as DocumentReference<ListingDocumentData>
}
