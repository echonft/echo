import { ListingDocumentData } from '../../src/types/model/listing-document-data'
import { listingDocumentDataMock } from './listing-document-data-mock'
import { listingReferenceMock } from './listing-reference-mock'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'

export const listingSnapshotMock: { [key: string]: QueryDocumentSnapshot<ListingDocumentData> } = {
  jUzMtPGKM62mMhEcmbN4: {
    ref: listingReferenceMock['jUzMtPGKM62mMhEcmbN4']!,
    id: listingReferenceMock['jUzMtPGKM62mMhEcmbN4']!.id,
    exists: true,
    data: () => listingDocumentDataMock['jUzMtPGKM62mMhEcmbN4']
  } as unknown as QueryDocumentSnapshot<ListingDocumentData>
}
