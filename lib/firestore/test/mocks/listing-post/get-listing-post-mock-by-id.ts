import { listingPostMock } from '@echo/firestore-mocks/listing-post/listing-post-mock'

export function getListingPostMockById(id: string) {
  return listingPostMock[id]!
}
