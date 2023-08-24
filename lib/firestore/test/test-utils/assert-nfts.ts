import { getAllNfts } from '../../src/crud/nft/get-all-nfts'
import { Nft } from '../../src/types/model/nft'
import { getAllNftMocks } from '../mocks/get-all-nft-mocks'
import { getNftMockById } from '../mocks/get-nft-mock-by-id'
import { expect } from '@jest/globals'
import { equals, forEach } from 'ramda'

export async function assertNfts() {
  const nftMocks = getAllNftMocks()
  const nfts = await getAllNfts()
  expect(nfts.length).toEqual(nftMocks.length)
  forEach((nft: Nft) => {
    const nftId = nft.id
    if (!equals(nft, getNftMockById(nftId))) {
      throw Error(`nft ${nftId} is different from mock`)
    }
  }, nfts)
}
