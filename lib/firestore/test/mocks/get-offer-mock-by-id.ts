import { offerMock } from '@echo/firestore-mocks/offer-mock'

export function getOfferMockById(id: string) {
  return offerMock[id]!
}
