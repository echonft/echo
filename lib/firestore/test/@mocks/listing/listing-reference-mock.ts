import { type ListingDocumentData } from '@echo/firestore/types/model/listing/listing-document-data'
import { listingMockId } from '@echo/model-mocks/listing/listing-mock'
import { DocumentReference } from 'firebase-admin/firestore'

export function listingReferenceMock(): Record<string, DocumentReference<ListingDocumentData>> {
  return {
    jUzMtPGKM62mMhEcmbN4: {
      id: listingMockId(),
      path: `listings/${listingMockId()}`
    } as unknown as DocumentReference<ListingDocumentData>
  }
}
