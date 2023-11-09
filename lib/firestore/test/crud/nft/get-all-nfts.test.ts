import { getAllNfts } from '@echo/firestore-test/nft/get-all-nfts'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { type Nft } from '@echo/model/types/nft'
import { getAllNftMocks } from '@echo/model-mocks/nft/get-all-nft-mocks'
import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
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
