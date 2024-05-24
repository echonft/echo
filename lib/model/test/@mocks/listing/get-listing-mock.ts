import { getListingMockById } from '@echo/model-mocks/listing/get-listing-mock-by-id'
import { LISTING_MOCK_ID } from '@echo/model-mocks/listing/listing-mock'

export function getListingMock() {
  return getListingMockById(LISTING_MOCK_ID)
}
