import { getAllOfferThreadMocks } from '@echo/firestore-mocks/offer-thread/get-all-offer-thread-mocks'
import { getAllOfferThreads } from '@echo/firestore-test/offer-thread/get-all-offer-threads'
import { contentEq } from '@echo/utils/fp/content-eq'
import { expect } from '@jest/globals'

export async function assertOfferThreads() {
  const documents = await getAllOfferThreads()
  expect(contentEq(documents, getAllOfferThreadMocks())).toBeTruthy()
}
