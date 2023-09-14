import { offerMock } from '@echo/firestore-mocks/offer-mock'

export const getOfferMockById = (id: string) => offerMock[id]!
