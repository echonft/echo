import { listingMock } from '@echo/firestore-mocks/listing-mock'

export const getListingMockById = (id: string) => listingMock[id]!
