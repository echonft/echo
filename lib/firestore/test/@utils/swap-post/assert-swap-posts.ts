import { getAllSwapPostMocks } from '@echo/firestore-mocks/swap-post/get-all-swap-post-mocks'
import { getAllSwapPosts } from '@echo/firestore-test/swap-post/get-all-swap-posts'
import { contentEq } from '@echo/utils/fp/content-eq'
import { expect } from '@jest/globals'

export async function assertSwapPosts() {
  const documents = await getAllSwapPosts()
  expect(contentEq(documents, getAllSwapPostMocks())).toBeTruthy()
}
