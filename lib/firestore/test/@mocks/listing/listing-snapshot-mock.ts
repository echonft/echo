import { type ListingDocumentData } from '@echo/firestore/types/model/listing/listing-document-data'
import { listingDocumentDataMock } from '@echo/firestore-mocks/listing/listing-document-data-mock'
import { listingReferenceMock } from '@echo/firestore-mocks/listing/listing-reference-mock'
import { LISTING_MOCK_ID } from '@echo/model-mocks/listing/listing-mock'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'

export const listingSnapshotMock: Record<string, QueryDocumentSnapshot<ListingDocumentData>> = {
  jUzMtPGKM62mMhEcmbN4: {
    ref: listingReferenceMock[LISTING_MOCK_ID]!,
    id: listingReferenceMock[LISTING_MOCK_ID]!.id,
    exists: true,
    data: () => listingDocumentDataMock[LISTING_MOCK_ID]
  } as unknown as QueryDocumentSnapshot<ListingDocumentData>
}
