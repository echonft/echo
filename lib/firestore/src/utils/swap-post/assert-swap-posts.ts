import { getAllSwapPostMocks } from '@echo/firestore/mocks/swap-post/get-all-swap-post-mocks'
import { getAllSwapPosts } from '@echo/firestore/crud/swap-post/get-all-swap-posts'
import { eqListContent } from '@echo/utils/fp/eq-list-content'
import { expect } from '@jest/globals'

export async function assertSwapPosts() {
  const documents = await getAllSwapPosts()
  expect(eqListContent(documents, getAllSwapPostMocks())).toBeTruthy()
}
