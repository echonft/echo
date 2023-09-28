import { getAllListingPostMocks } from '@echo/firestore-mocks/listing-post/get-all-listing-post-mocks'
import { find, propEq } from 'ramda'

export function getListingPostMockByListingId(listingId: string) {
  const mocks = getAllListingPostMocks()
  return find(propEq(listingId, 'listingId'), mocks)!
}
