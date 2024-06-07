import { getCollectionSwapsCounts } from '@echo/firestore/crud/collection-swaps-count/get-collection-swaps-counts'
import { getAllCollectionSwapsCountMocks } from '@echo/firestore/mocks/collection-swaps-count/get-all-collection-swaps-count-mocks'
import { eqListContent } from '@echo/utils/fp/eq-list-content'
import { expect } from '@jest/globals'

export async function assertCollectionSwapsCounts() {
  const documents = await getCollectionSwapsCounts()
  expect(eqListContent(documents, getAllCollectionSwapsCountMocks())).toBeTruthy()
}
