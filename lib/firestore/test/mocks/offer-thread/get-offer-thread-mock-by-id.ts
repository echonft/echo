import { offerThreadMock } from '@echo/firestore-mocks/offer-thread/offer-thread-mock'

export function getOfferThreadMockById(id: string) {
  return offerThreadMock[id]!
}
