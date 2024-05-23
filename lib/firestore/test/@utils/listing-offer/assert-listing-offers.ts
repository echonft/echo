import { getAllListingOfferMocks } from '@echo/firestore-mocks/listing-offer/get-all-listing-offer-mocks'
import { getAllListingOffers } from '@echo/firestore-test/listing-offer/get-all-listing-offers'
import { eqListContent } from '@echo/utils/fp/eq-list-content'
import { expect } from '@jest/globals'

export async function assertListingOffers() {
  const documents = await getAllListingOffers()
  expect(eqListContent(documents, getAllListingOfferMocks())).toBeTruthy()
}
