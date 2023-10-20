import { type ListingPost } from '@echo/firestore/types/model/listing-post/listing-post'
import { listingPostMock } from '@echo/firestore-mocks/listing-post/listing-post-mock'
import { listingPostReferenceMock } from '@echo/firestore-mocks/listing-post/listing-post-reference-mock'
import { type QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'

export const listingPostSnapshotMock: Record<string, QueryDocumentSnapshot<ListingPost>> = {
  jXadAgs0rtUXZWfG9t0z: {
    ref: listingPostReferenceMock.jXadAgs0rtUXZWfG9t0z!,
    id: listingPostReferenceMock.jXadAgs0rtUXZWfG9t0z!.id,
    exists: true,
    data: () => listingPostMock.jXadAgs0rtUXZWfG9t0z
  } as unknown as QueryDocumentSnapshot<ListingPost>
}
