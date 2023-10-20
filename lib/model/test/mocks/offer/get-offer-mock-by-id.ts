import { offerMock } from '@echo/model-mocks/offer/offer-mock'

export function getOfferMockById(id: string) {
  return offerMock[id]!
}
