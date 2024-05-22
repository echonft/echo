import { getAllListingOfferMocks } from '@echo/firestore-mocks/listing-offer/get-all-listing-offer-mocks'
import { getAllListingOffers } from '@echo/firestore-test/listing-offer/get-all-listing-offers'
import { contentEq } from '@echo/utils/fp/content-eq'
import { expect } from '@jest/globals'

export async function assertListingOffers() {
  const documents = await getAllListingOffers()
  expect(contentEq(documents, getAllListingOfferMocks())).toBeTruthy()
}
