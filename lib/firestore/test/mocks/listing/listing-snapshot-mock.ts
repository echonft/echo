import type { ListingDocumentData } from '@echo/firestore/types/model/listing/listing-document-data'
import { listingDocumentDataMock } from '@echo/firestore-mocks/listing/listing-document-data-mock'
import { listingReferenceMock } from '@echo/firestore-mocks/listing/listing-reference-mock'
import type { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'

export const listingSnapshotMock: Record<string, QueryDocumentSnapshot<ListingDocumentData>> = {
  jUzMtPGKM62mMhEcmbN4: {
    ref: listingReferenceMock.jUzMtPGKM62mMhEcmbN4!,
    id: listingReferenceMock.jUzMtPGKM62mMhEcmbN4!.id,
    exists: true,
    data: () => listingDocumentDataMock.jUzMtPGKM62mMhEcmbN4
  } as unknown as QueryDocumentSnapshot<ListingDocumentData>
}
