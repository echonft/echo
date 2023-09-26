import { getAllListingOfferMocks } from '@echo/firestore-mocks/listing-offer/get-all-listing-offer-mocks'
import { filter, propEq } from 'ramda'

export function getListingOfferMocksByOfferId(offerId: string) {
  const mocks = getAllListingOfferMocks()
  return filter(propEq(offerId, 'offerId'), mocks)
}
