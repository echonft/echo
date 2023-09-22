import type { ListingPostDocumentData } from '@echo/firestore/types/model/listing-post/listing-post-document-data'
import type { DocumentReference } from 'firebase-admin/lib/firestore'

export const listingPostReferenceMock: { [key: string]: DocumentReference<ListingPostDocumentData> } = {
  jXadAgs0rtUXZWfG9t0z: {
    id: 'jXadAgs0rtUXZWfG9t0z',
    path: 'listing-posts/jXadAgs0rtUXZWfG9t0z'
  } as unknown as DocumentReference<ListingPostDocumentData>
}
