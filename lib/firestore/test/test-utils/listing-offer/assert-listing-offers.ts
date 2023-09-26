import { getAllListingOffers } from '@echo/firestore/crud/listing-offer/get-all-listing-offers'
import { getAllListingOfferMocks } from '@echo/firestore-mocks/listing-offer/get-all-listing-offer-mocks'
import { getListingOfferMockById } from '@echo/firestore-mocks/listing-offer/get-listing-offer-mock-by-id'
import { expect } from '@jest/globals'

export async function assertListingOffers() {
  const mocks = getAllListingOfferMocks()
  const documents = await getAllListingOffers()
  expect(documents.length).toEqual(mocks.length)
  for (const document of documents) {
    expect(document).toStrictEqual(getListingOfferMockById(document.id))
  }
}
