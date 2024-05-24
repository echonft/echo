import { getAllOffers } from '@echo/firestore-test/offer/get-all-offers'
import { getAllOfferMocks } from '@echo/model-mocks/offer/get-all-offer-mocks'
import { eqListContent } from '@echo/utils/fp/eq-list-content'
import { expect } from '@jest/globals'

export async function assertOffers() {
  const documents = await getAllOffers()
  expect(eqListContent(documents, getAllOfferMocks())).toBeTruthy()
}
