import { getAllListingPostMocks } from '@echo/firestore-mocks/listing-post/get-all-listing-post-mocks'
import { getAllListingPosts } from '@echo/firestore-test/listing-post/get-all-listing-posts'
import { contentEq } from '@echo/utils/fp/content-eq'
import { expect } from '@jest/globals'

export async function assertListingPosts() {
  const documents = await getAllListingPosts()
  expect(contentEq(documents, getAllListingPostMocks())).toBeTruthy()
}
