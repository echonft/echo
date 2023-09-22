import { listingMock } from '@echo/firestore-mocks/listing/listing-mock'

export function getListingMockById(id: string) {
  return listingMock[id]!
}
