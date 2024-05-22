import { getCollectionSwapsCounts } from '@echo/firestore/crud/collection-swaps-count/get-collection-swaps-counts'
import { getAllCollectionSwapsCountMocks } from '@echo/firestore-mocks/collection-swaps-count/get-all-collection-swaps-count-mocks'
import { contentEq } from '@echo/utils/fp/content-eq'
import { expect } from '@jest/globals'

export async function assertCollectionSwapsCounts() {
  const documents = await getCollectionSwapsCounts()
  expect(contentEq(documents, getAllCollectionSwapsCountMocks())).toBeTruthy()
}
