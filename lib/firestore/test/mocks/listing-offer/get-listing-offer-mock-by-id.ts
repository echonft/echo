import { listingOfferMock } from '@echo/firestore-mocks/listing-offer/listing-offer-mock'

export function getListingOfferMockById(id: string) {
  return listingOfferMock[id]!
}
