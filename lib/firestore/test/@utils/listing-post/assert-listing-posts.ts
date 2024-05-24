import { getAllListingPostMocks } from '@echo/firestore-mocks/listing-post/get-all-listing-post-mocks'
import { getAllListingPosts } from '@echo/firestore-test/listing-post/get-all-listing-posts'
import { eqListContent } from '@echo/utils/fp/eq-list-content'
import { expect } from '@jest/globals'

export async function assertListingPosts() {
  const documents = await getAllListingPosts()
  expect(eqListContent(documents, getAllListingPostMocks())).toBeTruthy()
}
