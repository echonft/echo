import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { OFFER_MOCK_TO_JOHNNYCAGE_ID } from '@echo/model-mocks/offer/offer-mock'

export function getOfferMock() {
  return getOfferMockById(OFFER_MOCK_TO_JOHNNYCAGE_ID)
}
