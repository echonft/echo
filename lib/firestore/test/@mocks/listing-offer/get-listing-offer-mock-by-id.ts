import { listingOfferMock } from '@echo/firestore-mocks/listing-offer/listing-offer-mock'
import { isNil } from 'ramda'

export function getListingOfferMockById(id: string) {
  const mock = listingOfferMock[id]
  if (isNil(mock)) {
    throw Error(`wrong ListingOffer mock id: ${id}`)
  }
  return mock
}
