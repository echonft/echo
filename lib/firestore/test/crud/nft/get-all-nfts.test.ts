import { getAllNfts } from '@echo/firestore/crud/nft/get-all-nfts'
import { getAllNftMocks } from '@echo/firestore-mocks/nft/get-all-nft-mocks'
import { getNftMockById } from '@echo/firestore-mocks/nft/get-nft-mock-by-id'
import type { Nft } from '@echo/model/types/nft'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import { forEach } from 'ramda'

describe('CRUD - nft - getAllNfts', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('get all nfts', async () => {
    const nftMocks = getAllNftMocks()
    const nfts = await getAllNfts()
    expect(nfts.length).toEqual(nftMocks.length)
    forEach((nft: Nft) => {
      expect(getNftMockById(nft.id)).toStrictEqual(nft)
    }, nfts)
  })
})
