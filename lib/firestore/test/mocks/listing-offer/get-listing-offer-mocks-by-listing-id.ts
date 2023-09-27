import { getAllListingOfferMocks } from '@echo/firestore-mocks/listing-offer/get-all-listing-offer-mocks'
import { filter, propEq } from 'ramda'

export function getListingOfferMocksByListingId(listingId: string) {
  const mocks = getAllListingOfferMocks()
  return filter(propEq(listingId, 'listingId'), mocks)
}
