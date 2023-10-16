import { getAllNfts } from '@echo/firestore/crud/nft/get-all-nfts'
import { getAllNftMocks } from '@echo/firestore-mocks/nft/get-all-nft-mocks'
import { getNftMockById } from '@echo/firestore-mocks/nft/get-nft-mock-by-id'
import type { Nft } from '@echo/model/types/nft'
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
