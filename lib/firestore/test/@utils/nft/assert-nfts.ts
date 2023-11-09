import { getAllNfts } from '@echo/firestore-test/nft/get-all-nfts'
import { type Nft } from '@echo/model/types/nft'
import { getAllNftMocks } from '@echo/model-mocks/nft/get-all-nft-mocks'
import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import { expect } from '@jest/globals'
import { forEach } from 'ramda'

export async function assertNfts() {
  const nftMocks = getAllNftMocks()
  const nfts = await getAllNfts()
  expect(nfts.length).toEqual(nftMocks.length)
  forEach((nft: Nft) => {
    expect(nft).toStrictEqual(getNftMockById(nft.id))
  }, nfts)
}
