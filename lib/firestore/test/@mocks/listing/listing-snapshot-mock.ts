import { type ListingDocumentData } from '@echo/firestore/types/model/listing/listing-document-data'
import { listingDocumentDataMock } from '@echo/firestore-mocks/listing/listing-document-data-mock'
import { listingReferenceMock } from '@echo/firestore-mocks/listing/listing-reference-mock'
import { listingMockId } from '@echo/model-mocks/listing/listing-mock'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'

export function listingSnapshotMock(): Record<string, QueryDocumentSnapshot<ListingDocumentData>> {
  return {
    jUzMtPGKM62mMhEcmbN4: {
      ref: listingReferenceMock()[listingMockId()]!,
      id: listingReferenceMock()[listingMockId()]!.id,
      exists: true,
      data: () => listingDocumentDataMock()[listingMockId()]
    } as unknown as QueryDocumentSnapshot<ListingDocumentData>
  }
}
