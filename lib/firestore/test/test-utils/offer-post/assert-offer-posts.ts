import { getAllOfferPosts } from '@echo/firestore/crud/offer-post/get-all-offer-posts'
import { getAllOfferPostMocks } from '@echo/firestore-mocks/offer-post/get-all-offer-post-mocks'
import { getOfferPostMockById } from '@echo/firestore-mocks/offer-post/get-offer-post-mock-by-id'
import { expect } from '@jest/globals'

export async function assertOfferPosts() {
  const mocks = getAllOfferPostMocks()
  const documents = await getAllOfferPosts()
  expect(documents.length).toEqual(mocks.length)
  for (const document of documents) {
    expect(document).toStrictEqual(getOfferPostMockById(document.id))
  }
}
