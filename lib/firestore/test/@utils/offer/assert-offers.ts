import { getAllOffers } from '@echo/firestore-test/offer/get-all-offers'
import { getAllOfferMocks } from '@echo/model-mocks/offer/get-all-offer-mocks'
import { contentEq } from '@echo/utils/fp/content-eq'
import { expect } from '@jest/globals'

export async function assertOffers() {
  const documents = await getAllOffers()
  expect(contentEq(documents, getAllOfferMocks())).toBeTruthy()
}
