import { getAllNftCollections } from '@echo/firestore/crud/nft-collection/get-all-nft-collections'
import { getAllNftCollectionMocks } from '@echo/firestore-mocks/nft-collection/get-all-nft-collection-mocks'
import { getNftCollectionMockById } from '@echo/firestore-mocks/nft-collection/get-nft-collection-mock-by-id'
import type { Collection } from '@echo/model/types/collection'
import { expect } from '@jest/globals'
import { forEach } from 'ramda'

export async function assertNftCollections() {
  const nftCollectionMocks = getAllNftCollectionMocks()
  const nftCollections = await getAllNftCollections()
  expect(nftCollections.length).toEqual(nftCollectionMocks.length)
  forEach((nftCollection: Collection) => {
    expect(nftCollection).toStrictEqual(getNftCollectionMockById(nftCollection.id))
  }, nftCollections)
}
