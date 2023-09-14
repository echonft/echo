import { getAllNfts } from '@echo/firestore/crud/nft/get-all-nfts'
import type { FirestoreNft } from '@echo/firestore/types/model/firestore-nft'
import { getAllNftMocks } from '@echo/firestore-mocks/get-all-nft-mocks'
import { getNftMockById } from '@echo/firestore-mocks/get-nft-mock-by-id'
import { expect } from '@jest/globals'
import { forEach } from 'ramda'

export async function assertNfts() {
  const nftMocks = getAllNftMocks()
  const nfts = await getAllNfts()
  expect(nfts.length).toEqual(nftMocks.length)
  forEach((nft: FirestoreNft) => {
    expect(getNftMockById(nft.id)).toStrictEqual(nft)
  }, nfts)
}
