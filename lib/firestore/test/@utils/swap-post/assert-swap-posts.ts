import { getAllSwapPostMocks } from '@echo/firestore-mocks/swap-post/get-all-swap-post-mocks'
import { getSwapPostMockById } from '@echo/firestore-mocks/swap-post/get-swap-post-mock-by-id'
import { getAllSwapPosts } from '@echo/firestore-test/swap-post/get-all-swap-posts'
import { expect } from '@jest/globals'

export async function assertSwapPosts() {
  const mocks = getAllSwapPostMocks()
  const documents = await getAllSwapPosts()
  expect(documents.length).toEqual(mocks.length)
  for (const document of documents) {
    expect(document).toStrictEqual(getSwapPostMockById(document.id))
  }
}
