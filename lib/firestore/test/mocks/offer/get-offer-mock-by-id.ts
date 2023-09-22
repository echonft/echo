import { offerMock } from '@echo/firestore-mocks/offer/offer-mock'

export function getOfferMockById(id: string) {
  return offerMock[id]!
}
