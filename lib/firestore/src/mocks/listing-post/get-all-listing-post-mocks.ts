import { type ListingPost } from '@echo/firestore/types/model/listing-post/listing-post'
import { listingPostMock } from '@echo/firestore/mocks/listing-post/listing-post-mock'
import { type NonEmptyArray } from 'ramda'

export function getAllListingPostMocks() {
  return Object.values(listingPostMock()) as NonEmptyArray<ListingPost>
}
