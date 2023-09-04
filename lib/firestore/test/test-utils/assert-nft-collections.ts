import { getAllNftCollections } from '../../src/crud/nft-collection/get-all-nft-collections'
import { getAllNftCollectionMocks } from '../mocks/get-all-nft-collection-mocks'
import { getNftCollectionMockById } from '../mocks/get-nft-collection-mock-by-id'
import { NftCollection } from '@echo/firestore-types'
import { expect } from '@jest/globals'
import { forEach } from 'ramda'

export async function assertNftCollections() {
  const nftCollectionMocks = getAllNftCollectionMocks()
  const nftCollections = await getAllNftCollections()
  expect(nftCollections.length).toEqual(nftCollectionMocks.length)
  forEach((nftCollection: NftCollection) => {
    expect(getNftCollectionMockById(nftCollection.id)).toStrictEqual(nftCollection)
  }, nftCollections)
}
