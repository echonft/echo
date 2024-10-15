import { listingPostMock } from '@echo/firestore/mocks/listing-post/listing-post-mock'
import { type ListingPostDocumentData } from '@echo/firestore/types/model/listing-post-document-data'
import { type NonEmptyArray } from 'ramda'

export function getAllListingPostMocks() {
  return Object.values(listingPostMock()) as NonEmptyArray<ListingPostDocumentData>
}
