import { getAllNftCollectionSwapsCounts } from '@echo/firestore/crud/nft-collection-swaps-count/get-all-nft-collection-swaps-counts'
import { getAllNftCollectionSwapsCountMocks } from '@echo/firestore-mocks/nft-collection-swaps-count/get-all-nft-collection-swaps-count-mocks'
import { getNftCollectionSwapsCountMockById } from '@echo/firestore-mocks/nft-collection-swaps-count/get-nft-collection-swaps-count-mock-by-id'
import { expect } from '@jest/globals'

export async function assertNftCollectionSwapsCounts() {
  const mocks = getAllNftCollectionSwapsCountMocks()
  const documents = await getAllNftCollectionSwapsCounts()
  expect(documents.length).toEqual(mocks.length)
  for (const document of documents) {
    expect(document).toStrictEqual(getNftCollectionSwapsCountMockById(document.id))
  }
}
