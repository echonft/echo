import { listingDocumentDataMock } from '@echo/firestore/mocks/listing/listing-document-data-mock'
import { listingReferenceMock } from '@echo/firestore/mocks/listing/listing-reference-mock'
import { type ListingDocumentData } from '@echo/firestore/types/model/listing/listing-document-data'
import { listingMockId } from '@echo/model/mocks/listing/listing-mock'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'

export function listingSnapshotMock(): Record<string, QueryDocumentSnapshot<ListingDocumentData>> {
  return {
    jUzMtPGKM62mMhEcmbN4: {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ref: listingReferenceMock()[listingMockId()]!,
      id: listingReferenceMock()[listingMockId()]?.id,
      exists: true,
      data: () => listingDocumentDataMock()[listingMockId()]
    } as unknown as QueryDocumentSnapshot<ListingDocumentData>
  }
}
