import { getAllSwapMocks } from '@echo/firestore/mocks/swap/get-all-swap-mocks'
import { getAllSwaps } from '@echo/firestore/crud/swap/get-all-swaps'
import { eqListContent } from '@echo/utils/fp/eq-list-content'
import { expect } from '@jest/globals'

export async function assertSwaps() {
  const documents = await getAllSwaps()
  expect(eqListContent(documents, getAllSwapMocks())).toBeTruthy()
}
