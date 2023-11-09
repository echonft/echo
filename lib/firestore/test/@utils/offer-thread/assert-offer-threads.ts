import { getAllOfferThreadMocks } from '@echo/firestore-mocks/offer-thread/get-all-offer-thread-mocks'
import { getOfferThreadMockById } from '@echo/firestore-mocks/offer-thread/get-offer-thread-mock-by-id'
import { getAllOfferThreads } from '@echo/firestore-test/offer-thread/get-all-offer-threads'
import { expect } from '@jest/globals'

export async function assertOfferThreads() {
  const mocks = getAllOfferThreadMocks()
  const documents = await getAllOfferThreads()
  expect(documents.length).toEqual(mocks.length)
  for (const document of documents) {
    expect(document).toStrictEqual(getOfferThreadMockById(document.id))
  }
}
