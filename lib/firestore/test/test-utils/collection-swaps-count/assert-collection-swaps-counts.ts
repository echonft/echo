import { getAllCollectionSwapsCountMocks } from '@echo/firestore-mocks/collection-swaps-count/get-all-collection-swaps-count-mocks'
import { getCollectionSwapsCountMockById } from '@echo/firestore-mocks/collection-swaps-count/get-collection-swaps-count-mock-by-id'
import { expect } from '@jest/globals'
import { getAllCollectionSwapsCounts } from '@test-utils/collection-swaps-count/get-all-collection-swaps-counts'

export async function assertCollectionSwapsCounts() {
  const mocks = getAllCollectionSwapsCountMocks()
  const documents = await getAllCollectionSwapsCounts()
  expect(documents.length).toEqual(mocks.length)
  for (const document of documents) {
    expect(document).toStrictEqual(getCollectionSwapsCountMockById(document.id))
  }
}
