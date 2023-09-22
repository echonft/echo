import { getAllNftCollections } from '@echo/firestore/crud/nft-collection/get-all-nft-collections'
import type { FirestoreNftCollection } from '@echo/firestore/types/model/nft-collection/firestore-nft-collection'
import { getAllNftCollectionMocks } from '@echo/firestore-mocks/nft-collection/get-all-nft-collection-mocks'
import { getNftCollectionMockById } from '@echo/firestore-mocks/nft-collection/get-nft-collection-mock-by-id'
import { expect } from '@jest/globals'
import { forEach } from 'ramda'

export async function assertNftCollections() {
  const nftCollectionMocks = getAllNftCollectionMocks()
  const nftCollections = await getAllNftCollections()
  expect(nftCollections.length).toEqual(nftCollectionMocks.length)
  forEach((nftCollection: FirestoreNftCollection) => {
    expect(nftCollection).toStrictEqual(getNftCollectionMockById(nftCollection.id))
  }, nftCollections)
}
