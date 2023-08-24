import { getAllNfts } from '../../src/crud/nft/get-all-nfts'
import { Nft } from '../../src/types/model/nft'
import { getAllNftMocks } from '../mocks/get-all-nft-mocks'
import { getNftMockById } from '../mocks/get-nft-mock-by-id'
import { expect } from '@jest/globals'
import { forEach } from 'ramda'

export async function assertNfts() {
  const nftMocks = getAllNftMocks()
  const nfts = await getAllNfts()
  expect(nfts.length).toEqual(nftMocks.length)
  forEach((nft: Nft) => {
    expect(getNftMockById(nft.id)).toStrictEqual(nft)
  }, nfts)
}
