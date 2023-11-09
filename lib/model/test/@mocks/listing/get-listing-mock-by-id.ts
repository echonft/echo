import { listingMock } from '@echo/model-mocks/listing/listing-mock'

export function getListingMockById(id: string) {
  return listingMock[id]!
}
