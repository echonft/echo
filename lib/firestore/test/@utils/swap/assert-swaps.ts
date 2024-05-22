import { getAllSwapMocks } from '@echo/firestore-mocks/swap/get-all-swap-mocks'
import { getAllSwaps } from '@echo/firestore-test/swap/get-all-swaps'
import { contentEq } from '@echo/utils/fp/content-eq'
import { expect } from '@jest/globals'

export async function assertSwaps() {
  const documents = await getAllSwaps()
  expect(contentEq(documents, getAllSwapMocks())).toBeTruthy()
}
