import { getAllSwaps } from '@echo/firestore/crud/swaps/get-all-swaps'
import { getAllSwapMocks } from '@echo/firestore-mocks/swap/get-all-swap-mocks'
import { getSwapMockById } from '@echo/firestore-mocks/swap/get-swap-mock-by-id'
import { expect } from '@jest/globals'

export async function assertSwaps() {
  const mocks = getAllSwapMocks()
  const documents = await getAllSwaps()
  expect(documents.length).toEqual(mocks.length)
  for (const document of documents) {
    expect(document).toStrictEqual(getSwapMockById(document.id))
  }
}
