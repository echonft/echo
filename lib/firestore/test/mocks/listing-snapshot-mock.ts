import type { ListingDocumentData } from '@echo/firestore/types/model/listing-document-data'
import { getListingDocumentDataMockById } from '@echo/firestore-mocks/get-listing-document-data-mock-by-id'
import { listingReferenceMock } from '@echo/firestore-mocks/listing-reference-mock'
import type { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'

export const listingSnapshotMock: { [key: string]: QueryDocumentSnapshot<ListingDocumentData> } = {
  jUzMtPGKM62mMhEcmbN4: {
    ref: listingReferenceMock['jUzMtPGKM62mMhEcmbN4']!,
    id: listingReferenceMock['jUzMtPGKM62mMhEcmbN4']!.id,
    exists: true,
    data: () => getListingDocumentDataMockById('jUzMtPGKM62mMhEcmbN4')
  } as unknown as QueryDocumentSnapshot<ListingDocumentData>
}
