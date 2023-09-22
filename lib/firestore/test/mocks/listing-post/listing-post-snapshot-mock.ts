import type { ListingPostDocumentData } from '@echo/firestore/types/model/listing-post/listing-post-document-data'
import { listingPostDocumentDataMock } from '@echo/firestore-mocks/listing-post/listing-post-document-data-mock'
import { listingPostReferenceMock } from '@echo/firestore-mocks/listing-post/listing-post-reference-mock'
import type { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'

export const listingPostSnapshotMock: { [key: string]: QueryDocumentSnapshot<ListingPostDocumentData> } = {
  jXadAgs0rtUXZWfG9t0z: {
    ref: listingPostReferenceMock['jXadAgs0rtUXZWfG9t0z']!,
    id: listingPostReferenceMock['jXadAgs0rtUXZWfG9t0z']!.id,
    exists: true,
    data: () => listingPostDocumentDataMock['jXadAgs0rtUXZWfG9t0z']
  } as unknown as QueryDocumentSnapshot<ListingPostDocumentData>
}
