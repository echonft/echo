import { getAllListingPostMocks } from '@echo/firestore-mocks/listing-post/get-all-listing-post-mocks'
import { getListingPostMockById } from '@echo/firestore-mocks/listing-post/get-listing-post-mock-by-id'
import { getAllListingPosts } from '@echo/firestore-test/listing-post/get-all-listing-posts'
import { expect } from '@jest/globals'

export async function assertListingPosts() {
  const mocks = getAllListingPostMocks()
  const documents = await getAllListingPosts()
  expect(documents.length).toEqual(mocks.length)
  for (const document of documents) {
    expect(document).toStrictEqual(getListingPostMockById(document.id))
  }
}
