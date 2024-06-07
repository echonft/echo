import { getListingMockById } from '@echo/model/mocks/listing/get-listing-mock-by-id'
import { listingMockId } from '@echo/model/mocks/listing/listing-mock'

export function getListingMock() {
  return getListingMockById(listingMockId())
}
