import { getAllOfferThreadMocks } from '@echo/firestore/mocks/offer-thread/get-all-offer-thread-mocks'
import { getAllOfferThreads } from '@echo/firestore/crud/offer-thread/get-all-offer-threads'
import { eqListContent } from '@echo/utils/fp/eq-list-content'
import { expect } from '@jest/globals'

export async function assertOfferThreads() {
  const documents = await getAllOfferThreads()
  expect(eqListContent(documents, getAllOfferThreadMocks())).toBeTruthy()
}
