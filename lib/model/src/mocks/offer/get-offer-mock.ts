import { getOfferMockById } from '@echo/model/mocks/offer/get-offer-mock-by-id'
import { offerMockToJohnnycageId } from '@echo/model/mocks/offer/offer-mock'

export function getOfferMock() {
  return getOfferMockById(offerMockToJohnnycageId())
}
