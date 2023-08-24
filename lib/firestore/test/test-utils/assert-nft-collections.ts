import { getAllNftCollections } from '../../src/crud/nft-collection/get-all-nft-collections'
import { NftCollection } from '../../src/types/model/nft-collection'
import { getAllNftCollectionMocks } from '../mocks/get-all-nft-collection-mocks'
import { getNftCollectionMockById } from '../mocks/get-nft-collection-mock-by-id'
import { expect } from '@jest/globals'
import { equals, forEach } from 'ramda'

export async function assertNftCollections() {
  const nftCollectionMocks = getAllNftCollectionMocks()
  const nftCollections = await getAllNftCollections()
  expect(nftCollections.length).toEqual(nftCollectionMocks.length)
  forEach((nftCollection: NftCollection) => {
    const nftCollectionId = nftCollection.id
    if (!equals(nftCollection, getNftCollectionMockById(nftCollectionId))) {
      throw Error(`nft collection ${nftCollectionId} is different from mock`)
    }
  }, nftCollections)
}
