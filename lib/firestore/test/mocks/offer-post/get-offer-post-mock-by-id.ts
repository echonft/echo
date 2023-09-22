import { offerPostMock } from '@echo/firestore-mocks/offer-post/offer-post-mock'

export function getOfferPostMockById(id: string) {
  return offerPostMock[id]!
}
