import { listingPostMock } from '@echo/firestore-mocks/listing-post/listing-post-mock'
import { isNil } from 'ramda'

export function getListingPostMockById(id: string) {
  const mock = listingPostMock[id]
  if (isNil(mock)) {
    throw Error(`wrong ListingPost mock id: ${id}`)
  }
  return mock
}
